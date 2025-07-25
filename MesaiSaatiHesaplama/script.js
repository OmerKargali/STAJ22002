document.getElementById('workHoursForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Formun varsayilan davranisini engelle

    const startTimeInput = document.getElementById('startTime').value;

    if (!startTimeInput) {
        alert("Lütfen geçerli bir giriş saati giriniz.");
        return;
    }

    const [startHour, startMinute] = startTimeInput.split(':').map(Number);

    // Normal mesai baslangici ve bitis saatleri
    const normalStartHour = 8; // 08:00
    const normalEndHour = 17; // 17:00
    const maxEndHour = 18;    // 18:00

    // Gec kalma hesaplamasi
    const lateMinutes = (startHour * 60 + startMinute) - (normalStartHour * 60);

    let endHour = normalEndHour;
    let endMinute = 0;

    if (lateMinutes > 0) {
        if (startHour >= 9) {
            // Eger 09:00 ve sonrasinda basliyorsa mesai 18:00'den sonraya eklenir
            const extraMinutes = lateMinutes - (60 * (9 - normalStartHour)); // 08:00 ile 09:00 arasi fark
            endHour = maxEndHour + Math.floor(extraMinutes / 60);
            endMinute = extraMinutes % 60;
        } else if (startHour < 9) {
            // Eger 08:00 ile 09:00 arasinda basliyorsa, en erken 18:00'de cikilir
            endHour = maxEndHour; // 18:00
            endMinute = 0;
        }
    }

    // Cikis saati 18:00'i gecemez, aksi durumda fazla mesai eklenir
    if (endHour > maxEndHour) {
        endHour = maxEndHour;
        endMinute = 0;
    }

    // Formatli saat olusturma
    const formattedEndHour = endHour.toString().padStart(2, '0');
    const formattedEndMinute = endMinute.toString().padStart(2, '0');
    const totalWorkTime = `09:00`; // Sabit mesai suresi

    // Sonuclari ekrana yazdirma
    document.getElementById('workTime').innerText = totalWorkTime;
    document.getElementById('endTime').innerText = `${formattedEndHour}:${formattedEndMinute}`;
});
