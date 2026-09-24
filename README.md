# Hero of Elyndra — Expanded Structure Build

Build ini memperpanjang struktur game menjadi 5 world.

## Struktur
- 5 World
- 3 stage utama per world
- 1 boss stage per world
- Total 20 section / stage
- Checkpoint di setiap stage
- Story intro setiap world
- Dialog sebelum boss
- Dialog setelah world selesai
- Stage banner dan progress bar

## World
1. Desa Lumina — boss: Goruk
2. Hutan Bisikan — boss: Vespera
3. Tambang Bara — boss: Brakka
4. Menara Langit — boss: Asterion
5. Benteng Malam — boss: Morvath

## Kontrol
PC: A/D, Space, J, K, Esc
HP: analog kiri + JUMP / ATK / SKILL

Buka index.html atau jalankan lewat Live Server.


## Update V4
- Double jump aktif untuk semua karakter.
- PC: klik kiri = serang, klik kanan = skill.
- 5 background world diganti menjadi file HD terpisah, satu background per world:
  1. Desa Lumina
  2. Hutan Bisikan
  3. Tambang Bara
  4. Menara Langit
  5. Benteng Malam

## V5 - Monster Animation + Boss Arena Fix
- Boss sekarang dikunci di dalam arena agar tidak kabur ke stage lain.
- Gerbang akhir boss tetap tertutup sampai animasi kematian boss selesai.
- Monster memakai animasi terpisah: idle, bergerak, menyerang, terkena hit, dan mati.
- Animasi diterapkan ke Slime, Goblin, Bat, Skeleton, Orc, Dark Mage, serta Morvath.
- Boss Goruk, Vespera, Brakka, dan Asterion otomatis memakai animasi tipe monster masing-masing.


## V6 - Combat Polish + Player Animation
- Jumlah musuh normal dikurangi agar eksplorasi dan platforming tidak tertutup spam combat.
  - World 1-2: sekitar 3 musuh per stage normal.
  - World 3-4: sekitar 4 musuh per stage normal.
  - World 5: sekitar 5 musuh per stage normal.
- AI boss memakai fase chase -> wind-up -> attack -> recovery.
- Boss melee tidak lagi memberi damage hanya karena sprite/animasi terlihat dekat.
  Damage diberikan hanya saat hitbox serangan aktif benar-benar menyentuh pemain.
- Vespera melakukan dive ke ketinggian pemain sebelum serangan fisik.
- Boss caster memberi damage melalui projectile yang terlihat.
- Gerakan boss menggunakan interpolasi sehingga perubahan arah tidak terlalu patah.
- 4 karakter pemain sekarang memakai animasi:
  idle, run, jump/double jump, attack, skill, dan hurt.
- Animasi karakter diambil dari sprite sheet HD/pixel-art terpisah.


## V7 - Character Scale Normalization
- Portrait Arka, Selene, Raga, dan Nira dinormalisasi ke canvas dan tinggi visual yang sama.
- Menu pemilihan karakter sekarang memakai bottom alignment sehingga kaki semua karakter sejajar.
- Portrait HUD menggunakan versi normalisasi yang sama.
- Animasi in-game menggunakan satu skala sumber yang konsisten per karakter untuk idle/run/jump/attack/skill/hurt.
- Efek skill/serangan tetap dapat lebih lebar tanpa membuat ukuran badan karakter berubah drastis.


## V8 - Arka & Selene Smooth Animation
- Arka dibuat ulang: idle 6 frame, run 8, jump 4, attack 6, skill 8, hurt 3.
- Selene dibuat ulang: idle 6 frame, run 8, jump 4, attack 6, skill 8, hurt 3.
- Idle dan run diputar 7 FPS.
- Attack dan skill Arka/Selene memakai durasi frame 7 FPS agar seluruh transisi terlihat.
- Frame dipotong dan direpack dengan anchor bawah-tengah untuk mengurangi perubahan ukuran/posisi mendadak.
- Portrait menu/HUD Arka dan Selene diperbarui dari sprite baru.
- Raga dan Nira belum diubah pada build ini.


## V9 - 4 FPS + Clean Frame Fix
- Arka dan Selene sekarang memakai 4 FPS untuk limited-animation pixel-art feel.
- Frame attack dan skill dibersihkan dari serpihan sprite frame sebelah.
- Ujung pedang/magic effect yang nyasar dari frame tetangga sudah dibuang.
- Attack cooldown tetap responsif meskipun animasi visual diturunkan ke 4 FPS.
- Durasi action dipisahkan dari FPS agar combat tidak terasa sangat lambat.


## V10 - Motion-synced player animation
Perbaikan berdasarkan rekaman gameplay:
- Idle Arka/Selene tetap 4 FPS untuk gaya limited pixel animation.
- Run tidak lagi dikunci 4 FPS; frame berubah berdasarkan jarak yang benar-benar ditempuh.
- Pada kecepatan penuh Arka, run efektif sekitar 10-11 frame per detik.
- Joystick pelan otomatis membuat langkah lebih pelan sehingga kaki tidak terlihat skating.
- State animation di-reset saat berpindah idle/run/jump/attack sehingga tidak masuk pada frame acak.
- Arka attack sekitar 0.62 dtk, skill 0.92 dtk.
- Selene attack sekitar 0.72 dtk, skill 1.02 dtk.
- Asset attack/skill tetap menggunakan versi frame-clean dari V9.

## V11 - Arka fast timing
- Idle 4 FPS
- Run 9 FPS
- Jump 7 FPS
- Attack 11 FPS
- Skill 9 FPS
- Hurt 7 FPS
- Arka memakai sprite sheet baru dengan jarak antarpotongan lebih lebar.
