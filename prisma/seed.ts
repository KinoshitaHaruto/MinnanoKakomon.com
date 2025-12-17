
import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding...')

    // 1. Universities
    const universitiesData = fs.readFileSync(path.join(__dirname, 'data', 'universities.csv'), 'utf-8')
    const universitiesLines = universitiesData.split('\n').slice(1).filter(Boolean)

    for (const line of universitiesLines) {
        const [name, domain, prefecture] = line.trim().split(',')
        await prisma.university.upsert({
            where: { id: name }, // Using name as ID workaround or we need to findFirst. Schema has CUID.
            // Wait, schema uses CUID. We need to find by name if we want idempotency avoiding duplicates by name.
            // But we don't have a unique constraint on name in schema (probably). 
            // Let's use findFirst to check existence.
            // Actually simpler: just use create for now if clean, but prompt asked for upsert/idempotency.
            // Let's try to find first.
            update: { domain, prefecture },
            create: { name, domain, prefecture },
        }).catch(async () => {
            // Fallback if id is not name. We can't use upsert effectively on non-unique non-id field without unique index.
            // Let's use findFirst -> update or create.
            const existing = await prisma.university.findFirst({ where: { name } })
            if (existing) {
                return prisma.university.update({ where: { id: existing.id }, data: { domain, prefecture } })
            }
            return prisma.university.create({ data: { name, domain, prefecture } })
        })
    }

    // Reload cache of universities for relation lookup
    const universities = await prisma.university.findMany()
    const univMap = new Map(universities.map(u => [u.name, u.id]))

    // 2. Faculties
    const facultiesData = fs.readFileSync(path.join(__dirname, 'data', 'faculties.csv'), 'utf-8')
    const facultiesLines = facultiesData.split('\n').slice(1).filter(Boolean)

    for (const line of facultiesLines) {
        const [univName, facultyName] = line.trim().split(',')
        const univId = univMap.get(univName)
        if (!univId) continue

        const existing = await prisma.faculty.findFirst({ where: { name: facultyName, universityId: univId } })
        if (!existing) {
            await prisma.faculty.create({ data: { name: facultyName, universityId: univId } })
        }
    }

    // Reload faculties
    const faculties = await prisma.faculty.findMany({ include: { university: true } })
    // Map: "UnivName-FacultyName" -> FacultyID
    const facultyMap = new Map(faculties.map(f => [`${f.university.name}-${f.name}`, f.id]))

    // 3. Departments
    const departmentsData = fs.readFileSync(path.join(__dirname, 'data', 'departments.csv'), 'utf-8')
    const departmentsLines = departmentsData.split('\n').slice(1).filter(Boolean)

    for (const line of departmentsLines) {
        const [univName, facultyName, deptName] = line.trim().split(',')
        const facultyId = facultyMap.get(`${univName}-${facultyName}`)
        if (!facultyId) continue

        const existing = await prisma.department.findFirst({ where: { name: deptName, facultyId } })
        if (!existing) {
            await prisma.department.create({ data: { name: deptName, facultyId } })
        }
    }

    // Reload departments
    const departments = await prisma.department.findMany({ include: { faculty: { include: { university: true } } } })
    // Map: "UnivName-FacultyName-DeptName" -> DeptID
    const deptMap = new Map(departments.map(d => [`${d.faculty.university.name}-${d.faculty.name}-${d.name}`, d.id]))

    // 4. Courses
    const coursesData = fs.readFileSync(path.join(__dirname, 'data', 'courses.csv'), 'utf-8')
    const coursesLines = coursesData.split('\n').slice(1).filter(Boolean)

    for (const line of coursesLines) {
        const [univName, facultyName, deptName, courseName, professor, rakutanScore] = line.trim().split(',')
        const deptId = deptMap.get(`${univName}-${facultyName}-${deptName}`)
        if (!deptId) continue

        const existing = await prisma.course.findFirst({ where: { name: courseName, departmentId: deptId } })
        if (!existing) {
            await prisma.course.create({
                data: {
                    name: courseName,
                    professor,
                    rakutanScore: parseFloat(rakutanScore),
                    departmentId: deptId
                }
            })
        }
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
