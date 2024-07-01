# Movie App

Movie App adalah aplikasi React Native yang memungkinkan pengguna untuk mencari film berdasarkan kata kunci, mencari film berdasarkan kategori, dan menandai film sebagai favorit. Aplikasi ini menggunakan API dari The Movie Database (TMDb) untuk memperoleh data film.

## Team
- **Bagus Rizki Setiawan**
- **Ahza Rijas Mezzalaji**

## Fitur

1. **Pencarian Berdasarkan Kata Kunci**: Pengguna dapat mencari film dengan memasukkan kata kunci tertentu.
2. **Pencarian Berdasarkan Kategori**: Pengguna dapat mencari film berdasarkan genre atau kategori tertentu.
3. **Favorit**: Pengguna dapat menandai film sebagai favorit dan melihat daftar film favorit mereka.

## Teknologi yang Digunakan

- **React Native:** Untuk membuat antarmuka pengguna aplikasi mobile.
- **TypeScript:** Untuk memberikan tipe data statis pada JavaScript.
- **React Navigation:** Untuk navigasi antar layar.
- **AsyncStorage:** Untuk menyimpan data favorit secara lokal di perangkat pengguna.
- **TMDb API:** Untuk mendapatkan data film.
- **Expo LinearGradient:** Untuk memberikan efek gradasi pada gambar latar belakang.
- **Expo Vector Icons:** Untuk ikon-ikon pada aplikasi.


## Prasyarat

Pastikan Anda sudah menginstal yang berikut di komputer Anda:

- Node.js
- Expo CLI
- Akun di The Movie Database (TMDb) untuk mendapatkan API key

## Instalasi

1. **Clone Repository**

   ```bash
   git clone https://github.com/bagusrizkisetiawan/Progate-Movie-App.git
   cd Progate-Movie-App
   ```

2. **Instal Dependensi**
   ```bash
   npm install
   ```


3. **Konfigurasi API Key**
   Buat file .env di root project dan tambahkan API key TMDb Anda:
   ```env
   API_ACCESS_TOKEN=your_tmdb_api_access_token
   ```

4. **Menjalankan Aplikasi**
   Setelah menginstal semua dependensi dan menambahkan API key, jalankan aplikasi dengan perintah berikut:
   ```terminal
   npx expo start
   
   ```
   Ini akan membuka Expo DevTools di browser Anda. Anda bisa menjalankan aplikasi di emulator atau perangkat fisik melalui Expo Go app.
