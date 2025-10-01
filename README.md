# Sezer Fan Selection – SDC Demo
Bu proje Vite + React ile hazırlanmış basit bir fan seçim demosudur. SDC grubunun CSV verisini okur ve filtreler uygular.

## Kurulum
1) Bu klasöre girin ve bağımlılıkları kurun:
```
npm install
```
2) Geliştirme sunucusunu başlatın:
```
npm run dev
```
3) Tarayıcıda verilen yerel adresi açın (örn. http://localhost:5173).

## Yayına Alma
```
npm run build
npm run preview    # yerelde önizleme
```
Oluşan `dist/` klasörünü Netlify/Vercel/hosting'e yükleyin.

## CSV Güncelleme
- `public/SDC_Fan_Data.csv` dosyasını kendi verilerinizle güncelleyebilirsiniz.
- Başka gruplar için (SRF/BRF/ECO) `public/` içine benzer CSV'ler eklenebilir ve App'e menü eklenir.
