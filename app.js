const title = document.querySelector('#title');
const progressbar = document.querySelector('.progressbar');
const progressval = document.querySelector('#progressval');
const progressdesc = document.querySelector('#progressdesc');
const prayerBtn = document.querySelector('#pray-btn');
const fajrTaqeebatBtn = document.querySelector('#fajr-btn');
const mainMenu = document.querySelector('.main-menu');
const prayerCtrls = document.querySelector('#prayer-controls');
const menuNext = document.querySelector('#menu-next');
const menuPrev = document.querySelector('#menu-prev');
const extraInfo = document.querySelector('#extra-info');
const returnMenu = document.querySelector('#return-menu');
const duaRoot = document.querySelector('#dua-root');
const topScrollBtn = document.querySelector('#top-scroll-btn');
const prayerCtrlsTop = document.querySelector('#prayer-controls-top');
const menuNextTop = document.querySelector('#menu-next-top');
const menuPrevTop = document.querySelector('#menu-prev-top');
const bottomScrollBtn = document.querySelector('#bottom-scroll-btn');

let progress = 0;
let index = 0;
let count = 0;

let selectedDataQuery = "";

const data = {
    "salah-layl" : [
        {
            "type" : "instruction",
            "description" : `
                <p class="fw-bold">Nawfilah Salat al-Layl</p><br>
                <p>
                    The first (8) Rak'ats are prayed like the morning prayer.<br>
                    Any surah can be read after Surah al-Fatiha.<br>
                    Consists of (4) two-rak'at salah.
                </p>
            `,
            "count" : 4
        },
        {
           "type" : "instruction-extra",
           "description" : `
                <p class="fw-bold">Salat al-Shaf'</p><br>
                <p>
                    The next (2) Rak'ats are also prayed like the morning prayer.
                    With the intention of Salat al-Shaf', recite (2) Rak'at:<br>
                    &emsp;Surah Fatiha and Surah al-Nas in the first rak'at.<br>
                    &emsp;Surah Fatiha and Surah al-Falaq in the second rak'at.
                </p>
           `,
           "extra": "Do not do qunoot and complete the salah as normal.",
           "count" : 1
        },
        {
            "type" : "instruction",
            "description" : `
                <p class="fw-bold">Salat al-Witr'</p><br>
                <p>
                    The remaining (1) Rak'at is prayed with the intention of Salat al-Witr.<br>
                    The (1) Rak'at consists of the following:<br>
                    &emsp;Surah al-Fatiha | (1) Time<br>
                    &emsp;Surah al-Ikhlas | (3) Times<br>
                    &emsp;Surah al-Nas | (1) Time<br>
                    &emsp;Surah al-Falaq | (1) Time<br> 
                </p>
            `,
            "count" : 1
        }, 
        {
            "type" : "instruction",
            "description" : `
                <p class="fw-bold">Pray for forgiveness for (40) people, either living or dead.</p>
                <p class="arabic">...اَللّهُمَّ اغْفِرْ ل</p>
                <p>Oh Allah, forgive ...</p>
            `,
            "count" : 40
        },
        {
            "type" : "instruction",
            "description" : `
                <p class="fw-bold">Recite the istigfar (70) times.</p>
                <p class="arabic">اَسْتَغْفِرُ اللّهَ رَبِّي وَ اَتُوْبُ اِلَيْهِ</p>
                <p>I seek forgiveness of Allah, my Lord, and I turn to Him</p>
            `,
            "count" : 70,
        }, 
        {
            "type" : "instruction",
            "description" : `
                <p class="fw-bold">Recite the following dua (7) times.</p>
                <p class="arabic">هذَا مَقَامُ الْعَآئِذِ بِكَ مِنَ النَّارِ</p>
                <p>This is the position of one who seeks refuge in You from the fire [of Hell]</p>
            `,
            "count" : 7,
        },
        {
            "type" : "instruction",
            "description" : `
                <p class="fw-bold">Recite the following dua (300) times.</p>
                <p class="arabic">اَلْعَفْوَ</p>
                <p>(I ask for) forgiveness</p><br>
            `,
            "count" : 300
        },
        {
            "type" : "instruction-extra",
            "description" : `
                <p class="fw-bold">Recite the following dua (1) time.</p>
                <p class="arabic">رَبِّ اغْفِرْ لِي وَ ارْحَمْنِي وَ تُبْ عَلَيَّ اِنَّكَ اَنْتَ التَّوَّابُ الرَّحِيْمُ</p>
                <p>Lord, forgive me and have mercy on me, and turn to me, Surely You are the Oft-returning, the Merciful</p>
            `,
            "extra" : "Upon completion, you may Supplicate Allah and ask for you Hajat.",
            "count" : 1
        },
        {
            "type" : "instruction",
            "description" : `
                <p class="fw-bold">Tasbih Fatima al-Zahra (as)</p><br>
                <p class="arabic">ٱللَّٰهُ أَكْبَرُ</p>
                <p>God is Greater [than any possible description]</p>
            `,
            "count" : 34
        },
        {
            "type" : "instruction",
            "description" : `
                <p class="fw-bold">Tasbih Fatima al-Zahra (as)</p><br>
                <p class="arabic">ٱلْحَمْدُ لِلَّٰهِ</p>
                <p>Praise be to God</p>
            `,
            "count" : 33
        },
        {
            "type" : "instruction",
            "description" : `
                <p class="fw-bold">Tasbih Fatima al-Zahra (as)</p><br>
                <p class="arabic">سُبْحَانَ ٱللَّٰهِ</p>
                <p>Glorified is God</p>
            `,
            "count" : 33
        },
        {
            "type" : "dua",
            "title" : "Dua Hazeen",
            "description" : "Supplication of the Grieved",
            "verses" : [
                {
                    "verse" : "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
                    "meaning" : "In the name of Allah, The Beneficent, the Merciful"
                },
                {
                    "verse" : "اَللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَآلِ مُحَمَّدٍ",
                    "meaning" : "O Allah bless Muhammad and his family"
                },
                {
                    "verse" : "اُنَاجِیْکَ یَا مَوْجُوْدًا فِیْ کُلِّ مَکَانٍ ",
                    "meaning" : "I whisper unto You O One Who is present in every place"
                },
                {
                    "verse" : "لَعَلَّکَ تَسْمَعُ نِدَآئِیْ فَقَدْ عَظُمَ جُرْمِیْ وَ قَلَّ حَیَآئِیْ",
                    "meaning" : "So that you may hear my call for surely my sin is excessive and my shame is less"
                },
                {
                    "verse" : "مَوْلَایَ یَا مَوْلَایَ اَیَّ الْاَھْوَالِ اَتَذَکَّرُ",
                    "meaning" : "My Master, O my Master which of the terrifying states shall I remember"
                },
                {
                    "verse" : "وَ اَیَّهَا اَنْسٰی وَ لَوْ لَمْ یَکُنْ اِلاَّ الْمَوْتُ لَکَفٰی",
                    "meaning" : "and which of them shall I forget for if there was nothing except death it would be enough"
                },
                {
                    "verse" : "کَیْفَ وَمَا بَعْدَ الْمَوْتِ اَعْظَمُ وَ اَدْهَی",
                    "meaning" : "then what about after death greater and much worse?"
                },
                {
                    "verse" : "مَولاَیَ یَا مَوْلاَیَ حَتّٰی مَتٰی وَ اِلٰي مَتٰي اَقُوْلُ",
                    "meaning" : "My master O my Master up to when and till when will I say,"
                },
                {
                    "verse" : "لَکَ الْعُتْبٰی مَرَّةً بَعْدَ اُخْرٰی ثُمَّ لاَ تَجِدُ عِنْدِیْ صِدْقًا وَ لاَ وَفَآءً",
                    "meaning" : "I am to blame, again and again, but then You do not find any truth or loyalty in me?"
                },
                {
                    "verse" : "فَیَاغَوْثَاهُ ثُمَّ وَاغَوْثَاهُ بِکَ",
                    "meaning" : "I call for help and I call for help,"
                },
                {
                    "verse" : "یَا اَللّٰهُ مِنْ هَوًی قَدْ غَلَبَنِیْ وَ مِنْ عَدُوٍّ قَدِ اسْتَکْلَبَ عَلَیَّ",
                    "meaning" : "O Allah from desires which have overpowered me and from the enemy which has pounced on me"
                },
                {
                    "verse" : "وَ مِنْ دُنْیَا قَدْ تَزَیَّنَتْ لِیْ وَ مِنْ نَفْسٍ اَمَّارَةٍ بِالسُّوٓءِ اِلاَّ مَا رَحِمَ رَبِّیْ",
                    "meaning" : "and from the world which attracts me and from the soul that leads towards evil except that on which my Lord has mercy (12:53)"
                },
                {
                    "verse" : "مَوْلاَیَ یَا مَوْلاَیَ اِنْ کُنْتَ رَحِمْتَ مِثْلِی فَارْحَمْنِیْ",
                    "meaning" : "My master O my master if You have had mercy on the likes of me then have mercy on me"
                },
                {
                    "verse" : "وَ اِنْ کُنْتَ قَبِلْتَ مِثْلِیْ فَاقْبَلْنِیْ",
                    "meaning" : "and if You have accepted from the likes of me then accept from me"
                },
                {
                    "verse" : "یَا قَبِلَ السَّحَرَةِ اِقْبَلْنِیْ یَا مَنْ لَمْ اَزَلْ اَتَعَرَّفُ مِنْهُ الْحُسْنٰی",
                    "meaning" : "O One Who accepts the early morning prayer accept me, O One who, I still know only good from Him"
                },
                {
                    "verse" : "یَا مَنْ یُغَذِّیْنِیْ بِالنِّعَمِ صَبَاحًا وَ مَسَآءً اِرْحَمْنِیْ یَوْمَ اٰتِیْکَ فَرْدًا شَاخِصًا اِلَیْکَ",
                    "meaning" : "O One who nourishes me with blessings morning and evening have mercy on me when I come to You alone,"
                },
                {
                    "verse" : "بَصَرِیْ مُقَلَّدًا عَمَلِیْ قَدْ تَبَرَّءَ جَمِیْعُ الْخَلْقِ مِنِّیْ",
                    "meaning" : "my glance fixed on You my actions carried on my neck When all of creation will withdraw away from me"
                },
                {
                    "verse" : "نَعَمْ وَ اَبِیْ وَ اُمِّیْ وَ مَنْ کَانَ لَهُ کَدِّیْ وَ سَعْیِیْ",
                    "meaning" : "yes, even my father and mother and those for whom I worked and struggled"
                },
                {
                    "verse" : "فَاِنْ لَمْ تَرْحَمْنِیْ فَمَنْ یَرْحَمُنِیْ",
                    "meaning" : "then if You will not have mercy on me who will have mercy on me"
                },
                {
                    "verse" : "وَ مَنْ یُوْنِسُ فِیْ الْقَبْرِ وَحْشَتِیْ وَ مَنْ یُنْطِقُ لِسَانِیْ اِذَا خَلَوْتُ بِعَمَلِیْ",
                    "meaning" : "who will give me solace from the loneliness of the grave and who will make me speak when I am alone with my deeds"
                },
                {
                    "verse" : "وَ سَاءَلْتَنِیْ عَمَّا اَنْتَ اَعْلَمُ بِهِ مِنِّیْ",
                    "meaning" : "and when You will ask me about what You know better than me?"
                },
                {
                    "verse" : "فَاِنْ قُلْتُ نَعَمْ فَاَیْنَ الْمَحْرَبُ مِنْ عَدْلِکَ",
                    "meaning" : "Then if I say yes (to my sins) where will be the escape from Your Justice?"
                },
                {
                    "verse" : "وَ اِنْ قُلْتُ لَمْ اَفْعَلْ قُلْتَ اَلَمْ اَکُنِ الشَّاهِدَ عَلَیْکَ",
                    "meaning" : "And if I say I did not commit it You will say was I not a witness over you?"
                },
                {
                    "verse" : "فَعَفْوُکَ عَفْوُکَ یَا مَوْلاَیَ قَبْلَ سَرَابِیْلِ الْقَطِرَانِ",
                    "meaning" : "So (I beseech) Your Forgiveness Your Pardon O my master before the wearing of the clothes of Hell"
                },
                {
                    "verse" : "عَفْوُکَ عَفْوُکَ یَا مَوْلاَیَ قَبْلَ جَهَنَّمَ وَ النِّیْرَانِ",
                    "meaning" : "Your Forgiveness Your Pardon O my Master before the Hell and the Fire"
                },
                {
                    "verse" : "عَفْوُکَ عَفْوُکَ یَا مَوْلاَیَ قَبْلَ اَنْ تُغَلَّ الْاَیْدِیْ اِلٰی الْاَعْنَاقِ",
                    "meaning" : "Your Forgiveness Your Forgiveness O my Master before the hands are tied to the necks"
                },
                {
                    "verse" : "یَا اَرْحَمَ الرَّاحِمِیْنَ وَ خَیْرَ الْغَافِرِیْنَ",
                    "meaning" : "O the most Merciful and the best of Forgivers"
                },
            ]
        }
    ],
    "fajr-taqeebat" : [
        {
            "type" : "instruction",
            "description" : `
                <p class="arabic">أَسْتَغْفِرُ ٱللَّهَ وَ أَتُوبُ إِلَيْهِ</p>
                <p>I pray the forgiveness of Allah and I repent before Him.</p>
            `,
            "count" : 10
        },
        {
            "type" : "instruction",
            "description" : `
                <p class="arabic">أَسْأَلُ ٱللَّهَ ٱلْعَافِيَةَ</p>
                <p>I beseech Allah for good health.</p>
            `,
            "count" : 10
        },
        {
            "type" : "instruction",
            "description" : `
                <p class="arabic">أَسْتَجِيـرُ بِٱللَّهِ مِنَ ٱلنَّارِ</p>
                <p>I seek Allah’s protection against Hellfire.<p>
            `,
            "count" : 10
        },
        {
            "type" : "instruction",
            "description" : `
                <p class="arabic">وَ أَسْأَلُهُ ٱلْجَنَّةَ</p>
                <p>I ask Him for Paradise.</p>
            `,
            "count" : 10
        },
        {
            "type" : "instruction",
            "description" : `
                <p class="arabic">أَسْأَلُ ٱللَّهَ ٱلْحُورَ ٱلْعِيـنَ</p>
                <p>I ask Allah for the Paradisiacal Women.</p>
            `,
            "count" : 10
        },
        {
            "type" : "instruction",
            "description" : `
                <p class="arabic">لاَ إِلٰهَ إِلاَّ ٱللَّهُ ٱلْمَلِكُ ٱلْحَقُّ ٱلْمُبينُ</p>
                <p>There is no god save Allah the King and evident Truth.</p>
            `,
            "count" : 10
        },
        {
            "type" : "instruction",
            "description" : `
                <p class="fw-bold">Surah al-Ikhlāṣ</p>
                <p class="arabic">بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ</p>
                <p class="arabic">قُلۡ هُوَ ٱللَّهُ أَحَدٌ (١) ٱللَّهُ ٱلصَّمَدُ (٢) لَمۡ يَلِدۡ وَلَمۡ يُولَدۡ (٣) وَلَمۡ يَكُن لَّهُۥ كُفُوًا أَحَدُۢ (٤)</p>
            `,
            "count" : 10
        },
        {
            "type" : "instruction",
            "description" : `
                <p class="arabic">صَلَّىٰ ٱللَّهُ عَلَىٰ مُحَمَّد وَآلِ مُحَمَّد</p>
                <p>May Allah send blessings to Muhammad and the Household of Muhammad.</p>
            `,
            "count" : 10
        },
        {
            "type" : "instruction",
            "description" : `
                <p class="arabic">سُبْحَانَ ٱللَّه وَٱلْحَمْدُ لِلَّهِوَلاَ إِلٰهَ إِلاَّ اللَّهُوَٱللَّهُ أَكْبَرُ وَلاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِٱللَّهِ ٱلْعَلِيِّ ٱلْعَظِيمِ </p>
                <p style="font-size: 11px;">All glory be to Allah, all praise be to Allah, there is no god save Allah. Allah is the Greatest
and there is neither might nor power save with Allah, the All-high and All-great.</p>
            `,
            "count" : 10
        },
        {
            "type" : "instruction",
            "description" : `
                <p class="arabic">مَا شَاءَ ٱللَّهُ كَانَ وَلاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِٱللَّهِ ٱلْعَلِيِّ ٱلْعَظِيمِ</p>
                <p>Only that which Allah wills shall come to pass and there is neither might nor power save with Allah, the All-high and All-great.</p>
            `,
            "count" : 10
        },
        {
            "type" : "dua",
            "title" : "Dua after the Dawn and Sunset Prayers",
            "description" : `
                Imam Ja\`far as-Sadiq (as) is reported to have said the one who desires to enjoy both the worldly life and
                and the Next World, and one who has eye ache, should say the following prayer after Salah.
            `,
            "verses" : [
                {
                    "verse" : "اَللَّهُمَّ إِنِّي أَسْأَلُكَ بِحَقِّ مُحَمَّد وَآلِ مُحَمَّد عَلَيْكَ",
                    "meaning" : "O Allah, I do beseech You, in the name of the right of Muhammad and the Household of Muhammad that is incumbent upon You"
                },
                {
                    "verse" : "صَلِّ عَلَىٰ مُحَمَّد وَآلِ مُحَمَّد",
                    "meaning" : "to send blessings to Muhammad and the Household of Muhammad"
                },
                {
                    "verse" : "وَٱجْعَلِ ٱلنُّورَ فِي بَصَرِي",
                    "meaning" : "and to give light to my insight,"
                },
                {
                    "verse" : "وَٱلْبَصِيـرَةَ فِي دِينِي",
                    "meaning" : "make me discerning in my religion,"
                },
                {
                    "verse" : "وَٱلْيَقِيـنَ فِي قَلْبِي",
                    "meaning" : "have conviction in my heart,"
                },
                {
                    "verse" : "وَٱلإِخْلاَصَ فِي عَمَلِي",
                    "meaning" : "sincerity in my deeds,"
                },
                {
                    "verse" : "وَٱلسَّلاَمَةَ فِي نَفْسِي",
                    "meaning" : "safety in my self,"
                },
                {
                    "verse" : "وَٱلسَّعَةَ فِي رِزْقِي",
                    "meaning" : "vastness in my sustenance,"
                },
                {
                    "verse" : "وَٱلشُّكْرَ لَكَ أَبَداً مَا أَبْقَيْتَنِي",
                    "meaning" : "and perpetual thankfulness for You as long as you keep me alive."
                }
            ]
        },
        {
            "type" : "instruction",
            "description" : `
                <p class="arabic">یَا عَزِیْزُ</p>
                <p>O Mighty</p>    
            `,
            "count" : 41
        },
    ]
};

function enableProgressbar() {
    progressbar.setAttribute("role", "progressbar");
    progressbar.setAttribute("aria-valuenow", 0);
    progressbar.setAttribute("aria-live", "polite");
}

function updateProgressbar() {
    const prayerStep = data[selectedDataQuery][index];
    progressbar.setAttribute("aria-valuenow", progress);
    progressbar.style.setProperty('--progress', progress + "%");
    progressval.innerText = `${count} / ${prayerStep["count"]}`;
}

function initializeDuaUI() {
    const prayerStep = data[selectedDataQuery][index];
    let html = "";

    const header_card = `
        <div class="card bg-dark text-light">
            <div class="card-body">
                <div class="card-title h3 fw-bold">${prayerStep["title"]}</div>
                <p class="card-text fw-light">${prayerStep["description"]}</p>
            </div>
        </div>
    `;

    html += header_card;

    for (let i = 0; i < prayerStep["verses"].length; i++) {
        const verse = prayerStep["verses"][i];
        const verse_card = `
        <div class="card bg-dark text-light mt-3">
            <div class="card-body">
                <p class="card-text arabic">${verse["verse"]}</p>
                <p class="card-text">${verse["meaning"]}</p>
            </div>
        </div>
        `;
        html += verse_card;
    }

    duaRoot.innerHTML = html;
}

function initializeProgressData() {
    const prayerStep = data[selectedDataQuery][index];

    topScrollBtn.style.setProperty('display', 'none');
    bottomScrollBtn.style.setProperty('display', 'none');
    prayerCtrlsTop.style.setProperty('display', 'none');
    duaRoot.replaceChildren();
    progressbar.style.setProperty('display', 'grid');
    progressdesc.innerHTML = prayerStep["description"];
    progressval.innerText = `${count} / ${prayerStep["count"]}`;

    if (prayerStep["type"] === "instruction") {
        extraInfo.innerText = "";
        extraInfo.style.setProperty('display', 'none');
    } else if (prayerStep["type"] === "instruction-extra") {
        extraInfo.innerText = prayerStep["extra"];
        extraInfo.style.setProperty('display', '');
    } else {
        progressbar.style.setProperty('display', 'none');
        extraInfo.innerText = "";
        extraInfo.style.setProperty('display', 'none');
        topScrollBtn.style.setProperty('display', '');
        prayerCtrlsTop.style.setProperty('display', '');
        bottomScrollBtn.style.setProperty('display', '');
        initializeDuaUI();
    }
}

enableProgressbar();

prayerBtn.addEventListener("click", () => {
    selectedDataQuery = "salah-layl";
    title.innerText = "Pray Salah al-Layl";
    mainMenu.style.setProperty('display', 'none');
    prayerCtrls.style.setProperty('display', '');
    initializeProgressData();
});

fajrTaqeebatBtn.addEventListener("click", () => {
    selectedDataQuery = "fajr-taqeebat";
    title.innerText = "Fajr Taqeebat";
    mainMenu.style.setProperty('display', 'none');
    prayerCtrls.style.setProperty('display', '');
    initializeProgressData();
});

progressbar.addEventListener("click", () => {
    const prayerStep = data[selectedDataQuery][index];
    if (progress === 100) {
        count = 0;
        progress = 0;
        index += 1;
        initializeProgressData();
        updateProgressbar();
    } else {
        count += 1;
        progress = (count / prayerStep["count"]) * 100;
        updateProgressbar();
    }
});

function moveMenuNext() {
    count = 0;
    progress = 0;
    if (index + 1 > data[selectedDataQuery].length - 1) {
        index = 0;
    } else {
        index += 1;
    }
    initializeProgressData();
    updateProgressbar();
}

function moveMenuPrev() {
    count = 0;
    progress = 0;
    if (index - 1 < 0) {
        index = data[selectedDataQuery].length - 1;
    } else {
        index -= 1;
    }
    initializeProgressData();
    updateProgressbar();
}

menuNext.addEventListener("click", moveMenuNext);
menuNextTop.addEventListener("click", moveMenuNext);

menuPrev.addEventListener("click", moveMenuPrev);
menuPrevTop.addEventListener("click", moveMenuPrev);

returnMenu.addEventListener("click", () => {
    count = 0;
    progress = 0;
    index = 0;

    updateProgressbar();

    title.innerText = "Salah al-Layl";
    duaRoot.replaceChildren();
    progressbar.style.setProperty('display', 'none');
    extraInfo.innerText = "";
    extraInfo.style.setProperty('display', 'none');
    mainMenu.style.setProperty('display', '');
    prayerCtrls.style.setProperty('display', 'none');
    topScrollBtn.style.setProperty('display', 'none');
    bottomScrollBtn.style.setProperty('display', 'none');
    selectedDataQuery = "";
});

topScrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

bottomScrollBtn.addEventListener("click", () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
});