const educationTechQuestions = [
    {
        id: 1,
        text: "Eğitimde teknoloji entegrasyonu ne anlama gelir?",
        options: [
            "Sadece bilgisayar laboratuvarlarında teknoloji kullanımı",
            "Öğrenme ve öğretme süreçlerini geliştirmek için teknolojinin etkili kullanımı",
            "Öğrencilere teknoloji dersleri vermek",
            "Sınıflarda projeksiyon cihazı kullanmak",
            "Okullarda internet bağlantısı sağlamak"
        ],
        correctAnswer: 1,
        difficulty: "easy"
    },
    {
        id: 2,
        text: "Aşağıdakilerden hangisi bir Öğrenme Yönetim Sistemi (LMS) örneğidir?",
        options: [
            "Microsoft Word",
            "Google Chrome",
            "Moodle",
            "Adobe Photoshop",
            "Windows 10"
        ],
        correctAnswer: 2,
        difficulty: "easy"
    },
    {
        id: 3,
        text: "Dijital okuryazarlık nedir?",
        options: [
            "Sadece bilgisayar kullanabilme becerisi",
            "Dijital teknolojileri kullanma, anlama ve değerlendirme yeteneği",
            "E-kitap okuma alışkanlığı",
            "İnternet üzerinden makale yazma becerisi",
            "Sosyal medya kullanımı"
        ],
        correctAnswer: 1,
        difficulty: "easy"
    },
    {
        id: 4,
        text: "Aşağıdakilerden hangisi bir eğitim teknolojisi aracı değildir?",
        options: [
            "Akıllı tahta",
            "Eğitim amaçlı mobil uygulamalar",
            "Mikroskop",
            "Çamaşır makinesi",
            "Eğitim simülasyonları"
        ],
        correctAnswer: 3,
        difficulty: "easy"
    },
    {
        id: 5,
        text: "E-öğrenme (E-learning) nedir?",
        options: [
            "Elektronik cihazlarla yapılan her türlü öğrenme",
            "Elektronik posta ile öğrenme",
            "Dijital teknolojiler ve internet aracılığıyla gerçekleşen öğrenme",
            "Elektronik kitaplardan öğrenme",
            "Elektrik kesintilerinde yapılan öğrenme"
        ],
        correctAnswer: 2,
        difficulty: "easy"
    },
    {
        id: 6,
        text: "Aşağıdakilerden hangisi bir video konferans platformudur?",
        options: [
            "Microsoft Excel",
            "Zoom",
            "Adobe Illustrator",
            "Spotify",
            "Netflix"
        ],
        correctAnswer: 1,
        difficulty: "easy"
    },
    {
        id: 7,
        text: "Eğitimde kullanılan 'Harmanlanmış Öğrenme' (Blended Learning) ne anlama gelir?",
        options: [
            "Sadece çevrimiçi eğitim",
            "Yüz yüze eğitim ve çevrimiçi eğitimin birleşimi",
            "Farklı yaş gruplarının bir arada eğitim alması",
            "Farklı derslerin birleştirilmesi",
            "Öğrencilerin kendi kendine öğrenmesi"
        ],
        correctAnswer: 1,
        difficulty: "easy"
    },
    {
        id: 8,
        text: "Aşağıdakilerden hangisi bir dijital değerlendirme aracıdır?",
        options: [
            "Kağıt kalem",
            "Tahta",
            "Kahoot",
            "Tebeşir",
            "Defter"
        ],
        correctAnswer: 2,
        difficulty: "easy"
    },
    {
        id: 9,
        text: "Eğitimde 'Artırılmış Gerçeklik' (Augmented Reality) nedir?",
        options: [
            "Gerçek dünya ortamına dijital içeriklerin eklenmesi",
            "Tamamen sanal bir ortam oluşturulması",
            "Öğrencilerin gerçek hayat deneyimlerinin artırılması",
            "Sınıf mevcudunun artırılması",
            "Öğretmenlerin gerçek hayat deneyimlerinin artırılması"
        ],
        correctAnswer: 0,
        difficulty: "easy"
    },
    {
        id: 10,
        text: "Eğitimde 'Dijital Vatandaşlık' kavramı neyi ifade eder?",
        options: [
            "Sadece e-devlet hizmetlerini kullanabilmeyi",
            "Dijital dünyada sorumlu ve etik davranma becerisini",
            "İnternet üzerinden vatandaşlık başvurusu yapabilmeyi",
            "Dijital ortamda vergi ödeyebilmeyi",
            "Dijital kimlik kartı kullanımını"
        ],
        correctAnswer: 1,
        difficulty: "easy"
    },
    {
        id: 11,
        text: "Aşağıdakilerden hangisi bir eğitim teknolojisi trendi değildir?",
        options: [
            "Yapay Zeka destekli öğrenme",
            "Sanal gerçeklik",
            "Daktilo ile yazı yazma",
            "Mobil öğrenme",
            "Oyunlaştırma"
        ],
        correctAnswer: 2,
        difficulty: "easy"
    },
    {
        id: 12,
        text: "Eğitimde 'Tersyüz Öğrenme' (Flipped Learning) modeli nedir?",
        options: [
            "Öğrencilerin sırtları dönük oturması",
            "Derslerin ters sırayla işlenmesi",
            "Teorik içeriğin evde, uygulama ve tartışmaların sınıfta yapılması",
            "Öğretmenin sınıfın arkasında durması",
            "Sınıf düzeninin ters çevrilmesi"
        ],
        correctAnswer: 2,
        difficulty: "easy"
    },
    {
        id: 13,
        text: "Aşağıdakilerden hangisi bir eğitsel oyun platformu değildir?",
        options: [
            "Minecraft Education Edition",
            "Quizizz",
            "Microsoft Word",
            "Kahoot",
            "Roblox Education"
        ],
        correctAnswer: 2,
        difficulty: "easy"
    },
    {
        id: 14,
        text: "Eğitimde 'Kişiselleştirilmiş Öğrenme' ne anlama gelir?",
        options: [
            "Her öğrenciye özel öğretmen atanması",
            "Öğrencilerin kendi başlarına öğrenmesi",
            "Öğrencilerin ilgi, ihtiyaç ve yeteneklerine göre uyarlanmış öğrenme deneyimi",
            "Öğrencilerin kendi ders programlarını oluşturması",
            "Öğrencilerin kendi sınıflarını seçmesi"
        ],
        correctAnswer: 2,
        difficulty: "easy"
    },
    {
        id: 15,
        text: "Aşağıdakilerden hangisi bir çevrimiçi işbirliği aracıdır?",
        options: [
            "Microsoft Paint",
            "Google Docs",
            "Windows Media Player",
            "Hesap Makinesi",
            "Notepad"
        ],
        correctAnswer: 1,
        difficulty: "easy"
    },
    {
        id: 16,
        text: "TPACK modeli eğitimde neyi ifade eder?",
        options: [
            "Teknolojik Pedagojik Alan Bilgisi",
            "Teknik Program Analiz Kontrolü",
            "Teorik Pratik Akademik Kontrol",
            "Teknoloji Planlama ve Akademik Koordinasyon",
            "Test Programı Analiz Kriterleri"
        ],
        correctAnswer: 0,
        difficulty: "medium"
    },
    {
        id: 17,
        text: "Eğitimde 'Oyunlaştırma' (Gamification) nedir?",
        options: [
            "Sadece eğitsel bilgisayar oyunları kullanmak",
            "Öğrencilerin teneffüste oyun oynamasını sağlamak",
            "Oyun mekaniklerini ve elementlerini eğitim süreçlerine entegre etmek",
            "Dersleri tamamen oyunlarla işlemek",
            "Öğrencilere oyun tasarlatmak"
        ],
        correctAnswer: 2,
        difficulty: "medium"
    },
    {
        id: 18,
        text: "Aşağıdakilerden hangisi bir MOOC (Massive Open Online Course) platformudur?",
        options: [
            "Instagram",
            "Coursera",
            "WhatsApp",
            "TikTok",
            "Snapchat"
        ],
        correctAnswer: 1,
        difficulty: "medium"
    },
    {
        id: 19,
        text: "Eğitimde 'Yapay Zeka' uygulamaları aşağıdakilerden hangisini sağlamaz?",
        options: [
            "Kişiselleştirilmiş öğrenme deneyimleri",
            "Otomatik değerlendirme ve geri bildirim",
            "Öğrenme analitiği ve veri yorumlama",
            "Öğretmenlerin yerini tamamen alma",
            "Adaptif öğrenme sistemleri"
        ],
        correctAnswer: 3,
        difficulty: "medium"
    },
    {
        id: 20,
        text: "Eğitimde 'Öğrenme Analitiği' (Learning Analytics) ne işe yarar?",
        options: [
            "Sadece öğrenci notlarını hesaplamak",
            "Öğrenci davranışlarını ve öğrenme verilerini analiz ederek eğitim süreçlerini iyileştirmek",
            "Okul bütçesini analiz etmek",
            "Öğretmen performansını değerlendirmek",
            "Ders kitaplarının kalitesini ölçmek"
        ],
        correctAnswer: 1,
        difficulty: "medium"
    },
    {
        id: 21,
        text: "Aşağıdakilerden hangisi 'Açık Eğitim Kaynakları' (OER) için doğrudur?",
        options: [
            "Her zaman ücretsizdir ama değiştirilemez",
            "Sadece üniversiteler tarafından kullanılabilir",
            "Serbestçe erişilebilir, kullanılabilir, uyarlanabilir ve paylaşılabilir eğitim materyalleridir",
            "Sadece basılı materyalleri kapsar",
            "Telif hakkı koruması altındadır ve izinsiz kullanılamaz"
        ],
        correctAnswer: 2,
        difficulty: "medium"
    },
    {
        id: 22,
        text: "Eğitimde 'Maker Hareketi' (Maker Movement) neyi teşvik eder?",
        options: [
            "Sadece teknoloji şirketlerinde çalışmayı",
            "Öğrencilerin pasif tüketici olmak yerine aktif üretici olmalarını",
            "El yazısı kullanımını artırmayı",
            "Geleneksel sınıf düzenini korumayı",
            "Öğretmen merkezli eğitimi"
        ],
        correctAnswer: 1,
        difficulty: "medium"
    },
    {
        id: 23,
        text: "Eğitimde 'Bulut Bilişim' (Cloud Computing) kullanımının avantajı nedir?",
        options: [
            "İnternet bağlantısına gerek olmaması",
            "Her zaman ücretsiz olması",
            "Verilere her yerden erişim ve işbirliği imkanı sağlaması",
            "Bilgisayar kullanımını azaltması",
            "Öğrencilerin daha az çalışmasını sağlaması"
        ],
        correctAnswer: 2,
        difficulty: "medium"
    },
    {
        id: 24,
        text: "Eğitimde 'Adaptif Öğrenme' (Adaptive Learning) sistemleri neyi amaçlar?",
        options: [
            "Tüm öğrencilere aynı içeriği sunmayı",
            "Öğrencilerin performansına ve ihtiyaçlarına göre içeriği ve zorluk seviyesini otomatik olarak ayarlamayı",
            "Sadece başarılı öğrencilere ileri seviye içerik sunmayı",
            "Öğretmenlerin iş yükünü artırmayı",
            "Eğitim maliyetlerini yükseltmeyi"
        ],
        correctAnswer: 1,
        difficulty: "medium"
    },
    {
        id: 25,
        text: "Eğitimde 'Mikro Öğrenme' (Microlearning) nedir?",
        options: [
            "Çok küçük yaştaki çocukların eğitimi",
            "Mikroskop kullanarak yapılan eğitim",
            "Kısa, odaklanmış ve belirli bir amaca yönelik küçük öğrenme birimleri",
            "Mikrofon kullanarak yapılan eğitim",
            "Çok az sayıda öğrenciyle yapılan eğitim"
        ],
        correctAnswer: 2,
        difficulty: "medium"
    },
    {
        id: 26,
        text: "Eğitimde 'Dijital Hikaye Anlatımı' (Digital Storytelling) nedir?",
        options: [
            "Sadece dijital kitaplar okumak",
            "Multimedya araçlarını kullanarak hikayeler oluşturma ve paylaşma süreci",
            "Öğretmenlerin dijital ortamda ders anlatması",
            "Dijital ortamda masal dinlemek",
            "E-kitap yayınlamak"
        ],
        correctAnswer: 1,
        difficulty: "medium"
    },
    {
        id: 27,
        text: "Eğitimde 'Bilişsel Yük Teorisi' (Cognitive Load Theory) neyi açıklar?",
        options: [
            "Bilgisayarların işlem kapasitesini",
            "Öğrencilerin taşıdığı kitap yükünü",
            "İnsan beyninin bilgi işleme kapasitesi ve sınırlarını",
            "Öğretmenlerin iş yükünü",
            "Okul müfredatının yoğunluğunu"
        ],
        correctAnswer: 2,
        difficulty: "medium"
    },
    {
        id: 28,
        text: "Aşağıdakilerden hangisi 'Yapılandırmacı Öğrenme Teorisi'nin bir özelliğidir?",
        options: [
            "Öğretmen merkezli eğitim",
            "Bilginin pasif alıcısı olarak öğrenci",
            "Öğrencilerin önceki bilgileri üzerine yeni bilgileri inşa etmesi",
            "Ezber öğrenmenin teşvik edilmesi",
            "Standart testlerin önemi"
        ],
        correctAnswer: 2,
        difficulty: "medium"
    },
    {
        id: 29,
        text: "Eğitimde 'Veri Gizliliği' (Data Privacy) neden önemlidir?",
        options: [
            "Sadece okul yönetimini ilgilendirir",
            "Öğrenci verilerinin korunması ve etik kullanımı için gereklidir",
            "Sadece yükseköğretimde önemlidir",
            "Teknoloji kullanımını engeller",
            "Sadece özel okullarda dikkate alınır"
        ],
        correctAnswer: 1,
        difficulty: "medium"
    },
    {
        id: 30,
        text: "Eğitimde 'Dijital Bölünme' (Digital Divide) kavramı neyi ifade eder?",
        options: [
            "Dijital ve analog eğitim arasındaki farkı",
            "Bilgisayar laboratuvarlarının bölümlere ayrılmasını",
            "Teknolojiye erişim ve kullanım konusundaki eşitsizlikleri",
            "Dijital ve basılı ders materyalleri arasındaki ayrımı",
            "Okullardaki internet hızı farklılıklarını"
        ],
        correctAnswer: 2,
        difficulty: "medium"
    },
    {
        id: 31,
        text: "Eğitimde 'Nöroöğrenme' (Neurolearning) yaklaşımı neyi temel alır?",
        options: [
            "Sadece IQ testlerini",
            "Beyin araştırmalarını ve sinir bilimini",
            "Geleneksel öğretim yöntemlerini",
            "Sadece davranışçı psikolojiyi",
            "Ekonomik faktörleri"
        ],
        correctAnswer: 1,
        difficulty: "hard"
    },
    {
        id: 32,
        text: "Eğitimde 'xAPI' (Experience API veya Tin Can API) nedir?",
        options: [
            "Bir programlama dili",
            "Öğrenme deneyimlerini kaydetmek ve paylaşmak için kullanılan bir e-öğrenme spesifikasyonu",
            "Bir video konferans platformu",
            "Bir işletim sistemi",
            "Bir donanım bileşeni"
        ],
        correctAnswer: 1,
        difficulty: "hard"
    },
    {
        id: 33,
        text: "Eğitimde 'Öğrenme Tasarımı' (Learning Design) ile 'Öğretim Tasarımı' (Instructional Design) arasındaki temel fark nedir?",
        options: [
            "İkisi tamamen aynı kavramlardır",
            "Öğrenme tasarımı öğrenen merkezli, öğretim tasarımı içerik merkezlidir",
            "Öğrenme tasarımı sadece çevrimiçi eğitimde kullanılır",
            "Öğretim tasarımı sadece yüz yüze eğitimde kullanılır",
            "Öğrenme tasarımı teori, öğretim tasarımı sadece uygulamadır"
        ],
        correctAnswer: 1,
        difficulty: "hard"
    },
    {
        id: 34,
        text: "Eğitimde 'Bağlantıcılık' (Connectivism) öğrenme teorisinin temel ilkesi nedir?",
        options: [
            "Bilginin sadece sınıf ortamında öğrenilmesi",
            "Öğrenmenin ağlar oluşturma ve bağlantılar kurma süreci olması",
            "Öğrenmenin sadece bireysel çalışmayla gerçekleşmesi",
            "Bilginin değişmez ve sabit olması",
            "Öğrenmenin sadece formal eğitimle gerçekleşmesi"
        ],
        correctAnswer: 1,
        difficulty: "hard"
    },
    {
        id: 35,
        text: "Eğitimde 'Blockchain' teknolojisinin potansiyel kullanım alanı nedir?",
        options: [
            "Sadece okul ücretlerinin ödenmesi",
            "Akademik kredilerin ve sertifikaların güvenli ve doğrulanabilir kaydı",
            "Sadece öğrenci yoklaması",
            "Sadece okul binalarının güvenliği",
            "Sadece öğretmen maaşlarının ödenmesi"
        ],
        correctAnswer: 1,
        difficulty: "hard"
    },
    {
        id: 36,
        text: "Eğitimde 'Evrensel Tasarım' (Universal Design for Learning - UDL) ilkeleri nelerdir?",
        options: [
            "Sadece engelli öğrencilere yönelik tasarım",
            "Sadece teknoloji kullanımına odaklanma",
            "Çoklu temsil, çoklu eylem ve ifade, çoklu katılım yolları sağlama",
            "Tüm öğrencilere aynı içeriği aynı şekilde sunma",
            "Sadece görsel öğrenenlere yönelik tasarım"
        ],
        correctAnswer: 2,
        difficulty: "hard"
    },
    {
        id: 37,
        text: "Eğitimde 'Öğrenme Ekolojisi' (Learning Ecology) kavramı neyi ifade eder?",
        options: [
            "Sadece çevre eğitimini",
            "Öğrenmenin gerçekleştiği karmaşık, dinamik ve birbiriyle ilişkili sistemler bütününü",
            "Okul bahçesinde ekoloji öğretimini",
            "Sadece çevrimiçi öğrenme ortamlarını",
            "Sınıf içi bitki yetiştirmeyi"
        ],
        correctAnswer: 1,
        difficulty: "hard"
    },
    {
        id: 38,
        text: "Eğitimde 'Epistemik Oyunlar' (Epistemic Games) nedir?",
        options: [
            "Sadece eğlence amaçlı oyunlar",
            "Profesyonel uygulama topluluklarının düşünme biçimlerini simüle eden öğrenme deneyimleri",
            "Sadece bilgi yarışmaları",
            "Öğrencilerin fiziksel aktivitelerini artıran oyunlar",
            "Sadece matematik öğretiminde kullanılan oyunlar"
        ],
        correctAnswer: 1,
        difficulty: "hard"
    },
    {
        id: 39,
        text: "Eğitimde 'Öğrenme Analitiği' ve 'Eğitsel Veri Madenciliği' arasındaki temel fark nedir?",
        options: [
            "İkisi tamamen aynı kavramlardır",
            "Öğrenme analitiği insan yorumuna odaklanırken, eğitsel veri madenciliği otomatik algoritma keşfine odaklanır",
            "Öğrenme analitiği sadece yükseköğretimde kullanılır",
            "Eğitsel veri madenciliği sadece K-12 eğitiminde kullanılır",
            "Öğrenme analitiği nitel, eğitsel veri madenciliği sadece nicel verilerle çalışır"
        ],
        correctAnswer: 1,
        difficulty: "hard"
    },
    {
        id: 40,
        text: "Eğitimde 'Siber Güvenlik Eğitimi'nin önemi nedir?",
        options: [
            "Sadece bilgisayar bilimi öğrencileri için gereklidir",
            "Dijital ortamlarda güvenli davranış, veri koruma ve etik dijital vatandaşlık için temel oluşturur",
            "Sadece okul yöneticilerini ilgilendirir",
            "Sadece yükseköğretimde önemlidir",
            "Sadece teknik personel için gereklidir"
        ],
        correctAnswer: 1,
        difficulty: "hard"
    },
    {
        id: 41,
        text: "Eğitimde 'Öğrenme Tasarımı Şablonları' (Learning Design Patterns) ne işe yarar?",
        options: [
            "Sadece sınıf dekorasyonu için kullanılır",
            "Başarılı öğretim stratejilerini yeniden kullanılabilir, paylaşılabilir formatta belgelemeye yarar",
            "Sadece ders planı formatını belirler",
            "Sadece öğrenci sıralarının düzenini belirler",
            "Sadece okul binalarının mimari tasarımını belirler"
        ],
        correctAnswer: 1,
        difficulty: "hard"
    },
    {
        id: 42,
        text: "Eğitimde 'Yapay Zeka Etiği' hangi konuları kapsar?",
        options: [
            "Sadece teknoloji şirketlerini ilgilendiren konuları",
            "Veri gizliliği, algoritma yanlılığı, şeffaflık, hesap verebilirlik ve adil erişim gibi konuları",
            "Sadece yapay zeka programlama dillerini",
            "Sadece robotların fiziksel güvenliğini",
            "Sadece yapay zeka sistemlerinin maliyetini"
        ],
        correctAnswer: 1,
        difficulty: "hard"
    },
    {
        id: 43,
        text: "Eğitimde 'Öğrenme Deneyimi Tasarımı' (Learning Experience Design - LXD) neyi amaçlar?",
        options: [
            "Sadece çevrimiçi kursların görsel tasarımını",
            "Öğrenen merkezli, hedef odaklı ve estetik açıdan tatmin edici öğrenme deneyimleri yaratmayı",
            "Sadece sınıf ortamının fiziksel tasarımını",
            "Sadece öğretim materyallerinin basılı versiyonlarını",
            "Sadece öğretmenlerin iş akışını kolaylaştırmayı"
        ],
        correctAnswer: 1,
        difficulty: "hard"
    },
    {
        id: 44,
        text: "Eğitimde 'Dağıtılmış Biliş' (Distributed Cognition) teorisi neyi savunur?",
        options: [
            "Bilişin sadece bireysel zihinlerde gerçekleştiğini",
            "Bilişin bireyler, araçlar ve ortam arasında dağıtıldığını",
            "Öğrenmenin sadece sınıf ortamında gerçekleştiğini",
            "Teknolojinin öğrenmede hiçbir rolü olmadığını",
            "Öğrenmenin sadece bireysel çalışmayla gerçekleştiğini"
        ],
        correctAnswer: 1,
        difficulty: "hard"
    },
    {
        id: 45,
        text: "Eğitimde 'Sosyomateryallik' (Sociomateriality) yaklaşımı neyi vurgular?",
        options: [
            "Sadece sosyal etkileşimlerin önemini",
            "Sosyal ve materyal unsurların birbirinden ayrılamaz şekilde iç içe geçtiğini",
            "Sadece materyal kaynakların önemini",
            "Teknolojinin sosyal etkileşimlerden bağımsız olduğunu",
            "Öğrenmenin sadece sosyal ortamlarda gerçekleştiğini"
        ],
        correctAnswer: 1,
        difficulty: "hard"
    }
];

const generalKnowledgeQuestions = [
    {
        id: 1,
        text: "Türkiye'nin başkenti hangi şehirdir?",
        options: ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya"],
        correctAnswer: 1,
        difficulty: "easy"
    },
    {
        id: 2,
        text: "Aşağıdakilerden hangisi bir programlama dili değildir?",
        options: ["Python", "Java", "HTML", "C++", "Ruby"],
        correctAnswer: 2,
        difficulty: "easy"
    },
    {
        id: 3,
        text: "Hangi gezegen güneş sistemimizde en büyüktür?",
        options: ["Mars", "Venüs", "Jüpiter", "Satürn", "Uranüs"],
        correctAnswer: 2,
        difficulty: "medium"
    },
    {
        id: 4,
        text: "İnsan vücudunda kaç kemik bulunur?",
        options: ["106", "156", "206", "256", "306"],
        correctAnswer: 2,
        difficulty: "medium"
    },
    {
        id: 5,
        text: "Hangi element periyodik tabloda 'Fe' sembolü ile gösterilir?",
        options: ["Flor", "Demir", "Fosfor", "Fermiyum", "Feldspar"],
        correctAnswer: 1,
        difficulty: "easy"
    },
    {
        id: 6,
        text: "Dünya'nın en derin okyanusu hangisidir?",
        options: ["Atlas Okyanusu", "Hint Okyanusu", "Pasifik Okyanusu", "Arktik Okyanusu", "Güney Okyanusu"],
        correctAnswer: 2,
        difficulty: "medium"
    },
    {
        id: 7,
        text: "DNA'nın açılımı nedir?",
        options: ["Deoksit Nitrik Asit", "Deoksiribonükleik Asit", "Dinitro Nükleik Asit", "Deoksi Nötral Asit", "Dinamik Nükleik Asit"],
        correctAnswer: 1,
        difficulty: "medium"
    },
    {
        id: 8,
        text: "Hangi yıl Türkiye Cumhuriyeti kurulmuştur?",
        options: ["1920", "1921", "1922", "1923", "1924"],
        correctAnswer: 3,
        difficulty: "easy"
    },
    {
        id: 9,
        text: "Pi sayısının ilk 3 basamağı nedir?",
        options: ["3.12", "3.13", "3.14", "3.15", "3.16"],
        correctAnswer: 2,
        difficulty: "easy"
    },
    {
        id: 10,
        text: "Hangisi bir Nobel ödül kategorisi değildir?",
        options: ["Fizik", "Kimya", "Matematik", "Edebiyat", "Barış"],
        correctAnswer: 2,
        difficulty: "medium"
    }
];

const allQuestions = [...educationTechQuestions, ...generalKnowledgeQuestions];

function getRandomQuestions(count = 10) {
    const easyQuestions = allQuestions.filter(q => q.difficulty === "easy");
    const mediumQuestions = allQuestions.filter(q => q.difficulty === "medium");
    const hardQuestions = allQuestions.filter(q => q.difficulty === "hard");

    const easyCount = Math.floor(count * 0.4);
    const mediumCount = Math.floor(count * 0.4);
    const hardCount = count - easyCount - mediumCount;

    function getRandomSubset(array, size) {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, size);
    }

    const selectedEasy = getRandomSubset(easyQuestions, easyCount);
    const selectedMedium = getRandomSubset(mediumQuestions, mediumCount);
    const selectedHard = getRandomSubset(hardQuestions, hardCount);
    
    const selectedQuestions = [...selectedEasy, ...selectedMedium, ...selectedHard]
        .sort(() => 0.5 - Math.random())
        .map((q, index) => ({
            ...q,
            id: index + 1
        }));
    
    return selectedQuestions;
}

const questions = getRandomQuestions(10);