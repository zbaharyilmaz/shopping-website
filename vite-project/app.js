import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'bootstrap'; // Bootstrap JS
import '@fortawesome/fontawesome-free/css/all.css'; // Font Awesome CSS
import {output} from "./src/variables"
import "./src/sass/style.scss"

const kategoriBas=()=>{
    butonlar.innerHTML=``
    let biriktir=``
    veri.forEach()
}

const kategoriTopla=(veri)=>{
    let hepsi=["All"]
    veri.forEach(urun=>{
        if(!hepsi.includes(urun.category)) hepsi.push(urun.category)
    })
console.log(hepsi);
}
const ekranaBas=(veri)=>{
    output.innerHTML=``;
    let biriktir= ``;
    veri.forEach(item=>{
        biriktir+=`
        <div class="card">
        <img src="${item.image}" class="p-2" height="250px" alt="Görsel"/>
        <div class="card-body">
          <h5 class="card-title line-clamp-1">${item.title}</h5>
          <p class="card-text line-clamp-3">${item.description}</p>
        </div>
        <div class="card-footer w-100 fw-bold d-flex justify-content-between gap-3">
          <span>Fiyat:</span><span>${item.price} ₺</span>
        </div>
        <div class="card-footer w-100 d-flex justify-content-center gap-3">
          <button class="btn btn-danger" data-id=${item.id}>Sepete Ekle</button>
          <button class="btn btn-primary" data-id=${item.image} data-bs-toggle="modal" data-bs-target="#exampleModal"> Detay Gör </button>
        </div>
      </div>`
    })
    output.innerHTML= biriktir;
};

const veriGetir=async()=>{    	//await: Bir işlemin tamamlanmasını bekler. API’den veri çekerken bu işlem bitmeden sonraki satıra geçmez.

    localStorage.clear() //sıfırlasın ve localstrg atsın.
    const res=await fetch("https://anthonyfs.pythonanywhere.com/api/products/"); 	//fetch: Bir URL’ye istek göndermek için kullanılan bir JavaScript fonksiyonudur.Burada, "https://anthonyfs.pythonanywhere.com/api/products/" adresine bir GET isteği gönderiliyor.
    //!console.log(res);  res: API’den dönen yanıt (response) nesnesidir. Bu nesne,şu özellikleri içerir: //status: HTTP durum kodunu gösterir (örneğin: 200, 404)//ok: İstek başarılıysa true, başarısızsa false.
    const data=await res.json() //res.json(): Gelen yanıt nesnesini, JSON formatına çevirir ve kullanıma hazır bir JavaScript objesi yapar.await: JSON verisi tamamen parse edilene kadar beklenir.
    console.log(data); //data: Çözümlenmiş veri burada saklanır. Bu, genellikle bir dizi ya da nesne olur.
    
    //*Amaç:Veriyi tarayıcı belleğinde saklayarak, sayfa yenilendiğinde veriyi tekrar yüklemek yerine localStorage’dan hızlıca almak. */
    localStorage.setItem("All",JSON.stringify(data)) //localStorage: Tarayıcıda veri saklamak için kullanılan bir API’dir. Bu, veriyi tarayıcı kapansa bile saklar. 
    //setItem(key, value) key: Saklanan verinin anahtar adı. Burada "All" olarak ayarlanmış. All anahtar ismi ile locakStorage a kaydedildi veri. value: Saklanacak veri. 
    //localStorage yalnızca string veri saklayabildiği için, veriyi JSON.stringify(data) ile JSON formatına dönüştürüp string olarak kaydediyoruz.
    ekranaBas(data)
    kategoriTopla(data)
};
veriGetir()

