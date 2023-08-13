<template>
  <main>
    <section class="card">
      <h1>Biodata</h1>
      <section class="info">
        <div class="image-info-container">
          <img src="/pp.jpg" alt="photo profile" width="200px" />
        </div>
        <div class="info-data">
          <p>Nama : Dian Prasetyo</p>
          <p>Alamat : Boyolali</p>
          <p>Hobi : Rebahan</p>
        </div>
      </section>
      <hr />
      <section>
        <p class="description">
          Saya adalah seorang junior web developer yang memiliki ketertarikan
          yang sangat tinggi pada bidang teknologi dan programming. saat ini
          sedang memperluas kemampuan pada front end development dengsn belajar
          di Bootcamp Intensif Vue JS batch 47 di Sanbercode.
        </p>
        <br />
        <p class="description">
          Halaman web ini saya buat untuk memenuhi tugas hari ke-2 yaitu tetang
          HTML dan css. halamman ini dibuat menggunakan HTML dan CSS dimana di
          halaman ini ada header yang berisi logo dan menu. serta ada section
          biodata yang berisi data diri saya
        </p>
      </section>
    </section>
  </main>
</template>

<style scoped>
.card {
  background-color: #ffffff;
  width: 480px;
  border-radius: 20px;
  box-shadow: 0 0px 10px 0 silver;
  margin: 48px auto;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.card h1 {
  text-align: center;
}

.info {
  display: flex;
  justify-content: space-around;
  gap: 32px;
}

.image-info-container {
  width: 200px;
  border-radius: 25px;
  overflow: hidden;
}

.image-info-container > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(130%);
}

.info-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
}

.description {
  line-height: 1.5rem;
  text-align: justify;
}
</style>
