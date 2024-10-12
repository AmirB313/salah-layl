const progressbar = document.querySelector('.progressbar');
const progressval = document.querySelector('.progressval');
let progress = 0;

const prayerInstructions = [
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
       "type" : "instruction",
       "description" : `
            <p class="fw-bold">Salat al-Shaf'</p><br>
            <p>
                The next (2) Rak'ats are also prayed like the morning prayer.<br><br>
                With the intention of Salat al-Shaf', recite (2) Rak'at with<br> 
                Surah Fatiha followed by Surah al-Nas in the first rak'at.<br>
                Surah Fatiha followed by Surah al-Falaq in the second rak'at.<br><br>
                Do not do qunoot and complete the salah as normal.
            </p>
       `,
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
        "type" : "instruction",
        "description" : `
            <p class="fw-bold">Recite the following dua (1) time.</p>
            <p class="arabic">رَبِّ اغْفِرْ لِي وَ ارْحَمْنِي وَ تُبْ عَلَيَّ اِنَّكَ اَنْتَ التَّوَّابُ الرَّحِيْمُ</p>
            <p>Lord, forgive me and have mercy on me, and turn to me, Surely You are the Oft-returning, the Merciful</p><br>
            <p>Upon completion, you may supplicate to Allah and ask for your Hajat.<p>
            <p>Complete the salah as normal.<p>
        `,
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
        "description" : `
            <p class="fw-bold">Dua Hazeen | Supplication of the Grieved</p>
        `,
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
];

function enableProgressbar() {
    progressbar.setAttribute("role", "progressbar");
    progressbar.setAttribute("aria-valuenow", 0);
    progressbar.setAttribute("aria-live", "polite");
}

function updateProgressbar() {
    progressbar.setAttribute("aria-valuenow", progress);
    progressbar.style.setProperty('--progress', progress + "%");
    progressval.innerText = `${progress}%`;
}

enableProgressbar();

progressbar.addEventListener("click", (e) => {
    if (progress === 100) {
        progress = 0;
        updateProgressbar();
    } else {
        progress += 10;
        updateProgressbar();
    }
})