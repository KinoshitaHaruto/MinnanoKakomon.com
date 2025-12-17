import React from 'react';

type Props = {
    onSelectPrefecture: (prefecture: string | null) => void;
    selectedPrefecture: string | null;
};

// SVGのクラス名(小文字)とDB/表示用の名前(大文字始まり)の対応表
const PREF_MAP: Record<string, string> = {
    hokkaido: 'Hokkaido', aomori: 'Aomori', iwate: 'Iwate', miyagi: 'Miyagi',
    akita: 'Akita', yamagata: 'Yamagata', fukushima: 'Fukushima',
    ibaraki: 'Ibaraki', tochigi: 'Tochigi', gunma: 'Gunma', saitama: 'Saitama',
    chiba: 'Chiba', tokyo: 'Tokyo', kanagawa: 'Kanagawa', niigata: 'Niigata',
    toyama: 'Toyama', ishikawa: 'Ishikawa', fukui: 'Fukui', yamanashi: 'Yamanashi',
    nagano: 'Nagano', gifu: 'Gifu', shizuoka: 'Shizuoka', aichi: 'Aichi',
    mie: 'Mie', shiga: 'Shiga', kyoto: 'Kyoto', osaka: 'Osaka',
    hyogo: 'Hyogo', nara: 'Nara', wakayama: 'Wakayama', tottori: 'Tottori',
    shimane: 'Shimane', okayama: 'Okayama', hiroshima: 'Hiroshima', yamaguchi: 'Yamaguchi',
    tokushima: 'Tokushima', kagawa: 'Kagawa', ehime: 'Ehime', kochi: 'Kochi',
    fukuoka: 'Fukuoka', saga: 'Saga', nagasaki: 'Nagasaki', kumamoto: 'Kumamoto',
    oita: 'Oita', miyazaki: 'Miyazaki', kagoshima: 'Kagoshima', okinawa: 'Okinawa'
};

export function JapanMap({ onSelectPrefecture, selectedPrefecture }: Props) {

    // クリックされた要素のクラス名から県名を特定する
    const handleClick = (e: React.MouseEvent<SVGElement>) => {
        // クリックターゲットの親<g>タグ（prefectureクラスを持つもの）を探す
        const target = (e.target as Element).closest('.prefecture');
        if (target) {
            const className = target.getAttribute('class') || '';
            // "aichi chubu prefecture" のような文字列の先頭("aichi")を取得
            const prefKey = className.split(' ')[0];
            const prefName = PREF_MAP[prefKey];
            if (prefName) {
                // Toggle logic: Deselect if already selected
                if (selectedPrefecture === prefName) {
                    onSelectPrefecture(null);
                } else {
                    onSelectPrefecture(prefName);
                }
            }
        }
    };

    // 選択されている県の色を変える関数
    const getFillColor = (prefKey: string) => {
        const prefName = PREF_MAP[prefKey];
        // 選択中は青(#3b82f6)、未選択はグレー(#eeeeee)
        return selectedPrefecture === prefName ? '#3b82f6' : '#eeeeee';
    };

    return (
        <div className="w-full aspect-square bg-white relative rounded-xl border border-blue-100 overflow-hidden">
            {/* React用に修正したSVG: viewBoxを広げて余白を作成 (-50 -50 1100 1100 で上下左右5%マージン) */}
            <svg
                className="geolonia-svg-map w-full h-full cursor-pointer"
                viewBox="-50 -50 1100 1100"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleClick}
            >
                <title>Japanese Prefectures</title>
                <desc>Created by Geolonia (https://geolonia.com/).</desc>
                <g className="svg-map">
                    <g className="prefectures">
                        <g className="okinawa kyushu-okinawa prefecture" data-code="47">
                            <title>沖縄 / Okinawa</title>
                            <path d="M144.9,456.4c-4.4,0-8,3.6-8,8v71.2c0,4.4,3.6,8,8,8h25.6c4.4,0,8-3.6,8-8v-71.2c0-4.4-3.6-8-8-8H144.9z" fill={getFillColor('okinawa')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="kagoshima kyushu kyushu-okinawa prefecture" data-code="46">
                            <title>鹿児島 / Kagoshima</title>
                            <path d="M99.3,912.7c-4.4,0-8,3.6-8,8V992c0,4.4,3.6,8,8,8h116.8c4.4,0,8-3.6,8-8v-71.2c0-4.4-3.6-8-8-8H99.3z" fill={getFillColor('kagoshima')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="miyazaki kyushu kyushu-okinawa prefecture" data-code="45">
                            <title>宮崎 / Miyazaki</title>
                            <path d="M167.8,821.5c-4.4,0-8,3.6-8,8v71.2c0,4.4,3.6,8,8,8h48.4c4.4,0,8-3.6,8-8v-71.2c0-4.4-3.6-8-8-8H167.8z" fill={getFillColor('miyazaki')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="oita kyushu kyushu-okinawa prefecture" data-code="44">
                            <title>大分 / Oita</title>
                            <path d="M167.8,730.2c-4.4,0-8,3.6-8,8v71.2c0,4.4,3.6,8,8,8h48.4c4.4,0,8-3.6,8-8v-71.2c0-4.4-3.6-8-8-8H167.8z" fill={getFillColor('oita')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="kumamoto kyushu kyushu-okinawa prefecture" data-code="43">
                            <title>熊本 / kumamoto</title>
                            <path d="M99.3,730.2c-4.4,0-8,3.6-8,8v162.5c0,4.4,3.6,8,8,8h48.4c4.4,0,8-3.6,8-8V738.2c0-4.4-3.6-8-8-8H99.3z" fill={getFillColor('kumamoto')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="nagasaki kyushu kyushu-okinawa prefecture" data-code="42">
                            <title>長崎 / Nagasaki</title>
                            <path d="M8,638.9c-4.4,0-8,3.6-8,8v94c0,4.4,3.6,8,8,8h25.6c4.4,0,8-3.6,8-8v-94c0-4.4-3.6-8-8-8H8z" fill={getFillColor('nagasaki')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="saga kyushu kyushu-okinawa prefecture" data-code="41">
                            <title>佐賀 / Saga</title>
                            <path d="M53.7,638.9c-4.4,0-8,3.6-8,8v94c0,4.4,3.6,8,8,8h25.6c4.4,0,8-3.6,8-8v-94c0-4.4-3.6-8-8-8H53.7z" fill={getFillColor('saga')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="fukuoka kyushu kyushu-okinawa prefecture" data-code="40">
                            <title>福岡 / Fukuoka</title>
                            <path d="M99.3,638.9c-4.4,0-8,3.6-8,8v71.2c0,4.4,3.6,8,8,8h116.8c4.4,0,8-3.6,8-8V647c0-4.4-3.6-8-8-8H99.3z" fill={getFillColor('fukuoka')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="kochi shikoku prefecture" data-code="39">
                            <title>高知 / Kochi</title>
                            <path d="M281.9,935.6c-4.4,0-8,3.6-8,8V992c0,4.4,3.6,8,8,8H353c4.4,0,8-3.6,8-8v-48.4c0-4.4-3.6-8-8-8H281.9z" fill={getFillColor('kochi')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="ehime shikoku prefecture" data-code="38">
                            <title>愛媛 / Ehime</title>
                            <path d="M281.9,867.1c-4.4,0-8,3.6-8,8v48.4c0,4.4,3.6,8,8,8H353c4.4,0,8-3.6,8-8v-48.4c0-4.4-3.6-8-8-8H281.9z" fill={getFillColor('ehime')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="kagawa shikoku prefecture" data-code="37">
                            <title>香川 / Kagawa</title>
                            <path d="M373.1,867.1c-4.4,0-8,3.6-8,8v48.4c0,4.4,3.6,8,8,8h71.2c4.4,0,8-3.6,8-8v-48.4c0-4.4-3.6-8-8-8H373.1z" fill={getFillColor('kagawa')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="tokushima shikoku prefecture" data-code="36">
                            <title>徳島 / Tokushima</title>
                            <path d="M373.1,935.6c-4.4,0-8,3.6-8,8V992c0,4.4,3.6,8,8,8h71.2c4.4,0,8-3.6,8-8v-48.4c0-4.4-3.6-8-8-8H373.1z" fill={getFillColor('tokushima')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="yamaguchi chugoku prefecture" data-code="35">
                            <title>山口 / Yamaguchi</title>
                            <path d="M281.9,638.9c-4.4,0-8,3.6-8,8v162.5c0,4.4,3.6,8,8,8h25.6c4.4,0,8-3.6,8-8V647c0-4.4-3.6-8-8-8H281.9z" fill={getFillColor('yamaguchi')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="hiroshima chugoku prefecture" data-code="34">
                            <title>広島 / Hiroshima</title>
                            <path d="M327.5,730.2c-4.4,0-8,3.6-8,8v71.2c0,4.4,3.6,8,8,8h48.4c4.4,0,8-3.6,8-8v-71.2c0-4.4-3.6-8-8-8H327.5z" fill={getFillColor('hiroshima')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="okayama chugoku prefecture" data-code="33">
                            <title>岡山 / Okayama</title>
                            <path d="M395.9,730.2c-4.4,0-8,3.6-8,8v71.2c0,4.4,3.6,8,8,8h25.6c4.4,0,8-3.6,8-8v-71.2c0-4.4-3.6-8-8-8H395.9z" fill={getFillColor('okayama')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="shimane chugoku prefecture" data-code="32">
                            <title>島根 / Shimane</title>
                            <path d="M327.5,638.9c-4.4,0-8,3.6-8,8v71.2c0,4.4,3.6,8,8,8h48.4c4.4,0,8-3.6,8-8V647c0-4.4-3.6-8-8-8H327.5z" fill={getFillColor('shimane')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="tottori chugoku prefecture" data-code="31">
                            <title>鳥取 / Tottori</title>
                            <path d="M395.9,638.9c-4.4,0-8,3.6-8,8v71.2c0,4.4,3.6,8,8,8h25.6c4.4,0,8-3.6,8-8V647c0-4.4-3.6-8-8-8H395.9z" fill={getFillColor('tottori')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="wakayama kinki prefecture" data-code="30">
                            <title>和歌山 / Wakayama</title>
                            <path d="M510,958.4c-4.4,0-8,3.6-8,8V992c0,4.4,3.6,8,8,8h71.2c4.4,0,8-3.6,8-8v-25.6c0-4.4-3.6-8-8-8H510z" fill={getFillColor('wakayama')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="nara kinki prefecture" data-code="29">
                            <title>奈良 / Nara</title>
                            <path d="M555.7,775.8c-4.4,0-8,3.6-8,8v162.5c0,4.4,3.6,8,8,8h25.6c4.4,0,8-3.6,8-8V783.9c0-4.4-3.6-8-8-8H555.7z" fill={getFillColor('nara')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="hyogo kinki prefecture" data-code="28">
                            <title>兵庫 / Hyogo</title>
                            <path d="M441.6,638.9c-4.4,0-8,3.6-8,8v162.5c0,4.4,3.6,8,8,8H490c4.4,0,8-3.6,8-8V647c0-4.4-3.6-8-8-8H441.6z" fill={getFillColor('hyogo')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="osaka kinki prefecture" data-code="27">
                            <title>大阪 / Osaka</title>
                            <path d="M510,775.8c-4.4,0-8,3.6-8,8v162.5c0,4.4,3.6,8,8,8h25.6c4.4,0,8-3.6,8-8V783.9c0-4.4-3.6-8-8-8H510z" fill={getFillColor('osaka')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="kyoto kinki prefecture" data-code="26">
                            <title>京都 / Kyoto</title>
                            <path d="M510,638.9c-4.4,0-8,3.6-8,8v116.8c0,4.4,3.6,8,8,8h71.2c4.4,0,8-3.6,8-8v-71.2c0-4.4-3.6-8-8-8h-25.6c-6.6,0-12-5.4-12-12V647c0-4.4-3.6-8-8-8H510z" fill={getFillColor('kyoto')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="shiga kinki prefecture" data-code="25">
                            <title>滋賀 / Shiga</title>
                            <path d="M601.3,684.6c-4.4,0-8,3.6-8,8v71.2c0,4.4,3.6,8,8,8h25.6c4.4,0,8-3.6,8-8v-71.2c0-4.4-3.6-8-8-8H601.3z" fill={getFillColor('shiga')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="mie kinki prefecture" data-code="24">
                            <title>三重 / Mie</title>
                            <path d="M601.3,775.8c-4.4,0-8,3.6-8,8V992c0,4.4,3.6,8,8,8h25.6c4.4,0,8-3.6,8-8V783.9c0-4.4-3.6-8-8-8H601.3z" fill={getFillColor('mie')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="aichi chubu prefecture" data-code="23">
                            <title>愛知 / Aichi</title>
                            <path d="M647,867.1c-4.4,0-8,3.6-8,8v71.2c0,4.4,3.6,8,8,8h71.2c4.4,0,8-3.6,8-8v-71.2c0-4.4-3.6-8-8-8H647z" fill={getFillColor('aichi')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="shizuoka chubu prefecture" data-code="22">
                            <title>静岡 / Shizuoka</title>
                            <path d="M738.2,867.1c-4.4,0-8,3.6-8,8v71.2c0,4.4,3.6,8,8,8h71.2c4.4,0,8-3.6,8-8v-71.2c0-4.4-3.6-8-8-8H738.2z" fill={getFillColor('shizuoka')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="gifu chubu prefecture" data-code="21">
                            <title>岐阜 / Gifu</title>
                            <path d="M647,593.3c-4.4,0-8,3.6-8,8v253.7c0,4.4,3.6,8,8,8h48.4c4.4,0,8-3.6,8-8V601.3c0-4.4-3.6-8-8-8H647z" fill={getFillColor('gifu')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="nagano chubu prefecture" data-code="20">
                            <title>長野 / Nagano</title>
                            <path d="M715.4,593.3c-4.4,0-8,3.6-8,8v253.7c0,4.4,3.6,8,8,8H741c4.4,0,8-3.6,8-8v-71.2c0-6.6,5.4-12,12-12h2.7c4.4,0,8-3.6,8-8V601.3c0-4.4-3.6-8-8-8H715.4z" fill={getFillColor('nagano')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="yamanashi chubu prefecture" data-code="19">
                            <title>山梨 / Yamanashi</title>
                            <path d="M761,775.8c-4.4,0-8,3.6-8,8v71.2c0,4.4,3.6,8,8,8h48.4c4.4,0,8-3.6,8-8v-71.2c0-4.4-3.6-8-8-8H761z" fill={getFillColor('yamanashi')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="fukui chubu prefecture" data-code="18">
                            <title>福井 / Fukui</title>
                            <path d="M555.7,638.9c-4.4,0-8,3.6-8,8v25.6c0,4.4,3.6,8,8,8h71.2c4.4,0,8-3.6,8-8v-71.2c0-4.4-3.6-8-8-8h-25.6c-4.4,0-8,3.6-8,8v25.6c0,6.6-5.4,12-12,12H555.7z" fill={getFillColor('fukui')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="ishikawa chubu prefecture" data-code="17">
                            <title>石川 / Ishikawa</title>
                            <path d="M601.3,433.6c-4.4,0-8,3.6-8,8v139.6c0,4.4,3.6,8,8,8h25.6c4.4,0,8-3.6,8-8V441.6c0-4.4-3.6-8-8-8H601.3z" fill={getFillColor('ishikawa')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="toyama chubu prefecture" data-code="16">
                            <title>富山 / Toyama</title>
                            <path d="M647,502c-4.4,0-8,3.6-8,8v71.2c0,4.4,3.6,8,8,8h71.2c4.4,0,8-3.6,8-8V510c0-4.4-3.6-8-8-8H647z" fill={getFillColor('toyama')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="niigata chubu prefecture" data-code="15">
                            <title>新潟 / Niigata</title>
                            <path d="M738.2,502c-4.4,0-8,3.6-8,8v71.2c0,4.4,3.6,8,8,8h71.2c4.4,0,8-3.6,8-8V464.4c0-4.4-3.6-8-8-8h-25.6c-4.4,0-8,3.6-8,8V490c0,6.6-5.4,12-12,12H738.2z" fill={getFillColor('niigata')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="kanagawa kanto prefecture" data-code="14">
                            <title>神奈川 / Kanagawa</title>
                            <path d="M829.5,867.1c-4.4,0-8,3.6-8,8v48.4c0,4.4,3.6,8,8,8h48.4c4.4,0,8-3.6,8-8v-48.4c0-4.4-3.6-8-8-8H829.5z" fill={getFillColor('kanagawa')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="tokyo kanto prefecture" data-code="13">
                            <title>東京 / Tokyo</title>
                            <path d="M829.5,775.8c-4.4,0-8,3.6-8,8v71.2c0,4.4,3.6,8,8,8h48.4c4.4,0,8-3.6,8-8v-2.7c0-6.6,5.4-12,12-12h25.6c4.4,0,8-3.6,8-8v-48.4c0-4.4-3.6-8-8-8H829.5z" fill={getFillColor('tokyo')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="chiba kanto prefecture" data-code="12">
                            <title>千葉 / Chiba</title>
                            <path d="M943.6,730.2c-4.4,0-8,3.6-8,8v208.1c0,4.4,3.6,8,8,8H992c4.4,0,8-3.6,8-8V738.2c0-4.4-3.6-8-8-8H943.6z" fill={getFillColor('chiba')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="saitama kanto prefecture" data-code="11">
                            <title>埼玉 / Saitama</title>
                            <path d="M783.9,684.6c-4.4,0-8,3.6-8,8v71.2c0,4.4,3.6,8,8,8h139.6c4.4,0,8-3.6,8-8v-71.2c0-4.4-3.6-8-8-8H783.9z" fill={getFillColor('saitama')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="gunma kanto prefecture" data-code="10">
                            <title>群馬 / Gunma</title>
                            <path d="M783.9,593.3c-4.4,0-8,3.6-8,8v71.2c0,4.4,3.6,8,8,8H848c1.5,0,3.7-3.1,3.7-8v-71.2c0-4.9-2.2-8-3.7-8H783.9z" fill={getFillColor('gunma')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="tochigi kanto prefecture" data-code="9">
                            <title>栃木 / Tochigi</title>
                            <path d="M859.4,593.3c-1.5,0-3.7,3.1-3.7,8v71.2c0,4.9,2.2,8,3.7,8h64.1c4.4,0,8-3.6,8-8v-71.2c0-4.4-3.6-8-8-8H859.4z" fill={getFillColor('tochigi')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="ibaraki kanto prefecture" data-code="8">
                            <title>茨城 / Ibaraki</title>
                            <path d="M943.6,593.3c-4.4,0-8,3.6-8,8v116.8c0,4.4,3.6,8,8,8H992c4.4,0,8-3.6,8-8V601.3c0-4.4-3.6-8-8-8H943.6z" fill={getFillColor('ibaraki')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="fukushima tohoku prefecture" data-code="7">
                            <title>福島 / Fukushima</title>
                            <path d="M829.5,456.4c-4.4,0-8,3.6-8,8v116.8c0,4.4,3.6,8,8,8H992c4.4,0,8-3.6,8-8V464.4c0-4.4-3.6-8-8-8H829.5z" fill={getFillColor('fukushima')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="yamagata tohoku prefecture" data-code="6">
                            <title>山形 / Yamagata</title>
                            <path d="M783.9,387.9c-4.4,0-8,3.6-8,8v48.4c0,4.4,3.6,8,8,8h94c4.4,0,8-3.6,8-8v-48.4c0-4.4-3.6-8-8-8H783.9z" fill={getFillColor('yamagata')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="akita tohoku prefecture" data-code="5">
                            <title>秋田 / Akita</title>
                            <path d="M783.9,296.6c-4.4,0-8,3.6-8,8v71.2c0,4.4,3.6,8,8,8h94c4.4,0,8-3.6,8-8v-71.2c0-4.4-3.6-8-8-8H783.9z" fill={getFillColor('akita')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="miyagi tohoku prefecture" data-code="4">
                            <title>宮城 / Miyagi</title>
                            <path d="M898,387.9c-4.4,0-8,3.6-8,8v48.4c0,4.4,3.6,8,8,8h94c4.4,0,8-3.6,8-8v-48.4c0-4.4-3.6-8-8-8H898z" fill={getFillColor('miyagi')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="iwate tohoku prefecture" data-code="3">
                            <title>岩手 / Iwate</title>
                            <path d="M898,296.6c-4.4,0-8,3.6-8,8v71.2c0,4.4,3.6,8,8,8h94c4.4,0,8-3.6,8-8v-71.2c0-4.4-3.6-8-8-8H898z" fill={getFillColor('iwate')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="aomori tohoku prefecture" data-code="2">
                            <title>青森 / Aomori</title>
                            <path d="M783.9,228.2c-4.4,0-8,3.6-8,8v48.4c0,4.4,3.6,8,8,8H992c4.4,0,8-3.6,8-8v-48.4c0-4.4-3.6-8-8-8H783.9z" fill={getFillColor('aomori')} className="transition-colors hover:fill-blue-200" />
                        </g>
                        <g className="hokkaido prefecture" data-code="1">
                            <title>北海道 / Hokkaido</title>
                            <path d="M783.9,0c-4.4,0-8,3.6-8,8v185.3c0,4.4,3.6,8,8,8h48.4c4.4,0,8-3.6,8-8v-25.6c0-6.6,5.4-12,12-12H992c4.4,0,8-3.6,8-8V8c0-4.4-3.6-8-8-8H783.9z" fill={getFillColor('hokkaido')} className="transition-colors hover:fill-blue-200" />
                        </g>
                    </g>
                    <g className="boundary-line" stroke="#EEEEEE" strokeWidth="12" strokeLinejoin="round">
                        <path d="M216.1,593.3H89.3c-1.1,0-2-0.9-2-2s0.9-2,2-2h126.9c4.4,0,8-3.6,8-8V454.4c0-1.1,0.9-2,2-2s2,0.9,2,2v126.9C228.2,587.9,222.8,593.3,216.1,593.3z" />
                    </g>
                </g>
            </svg>
        </div>
    );
}   