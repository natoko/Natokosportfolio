'use strict'

{
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll',()=> {
    if (window.scrollY < 200) {
      navbar.classList.remove('gray');
    } else {
      navbar.classList.add('gray');
    }
  })

  const works = [
    {image: 'img/Portfolio.png',
     title : 'Portfolio Site',
     url : 'https://natoko.github.io/Natokosportfolio/',
     sourcecode : 'https://github.com/natoko/Natokosportfolio',
     detail: 'このサイトです。レスポンシブデザインになるようにBootstrapで調整をしました。「Works」のクリックして詳細表示のところはJavaScriptで作成しています。',
     skill: 'HTML,CSS,Bootstrap,JavaScript',
   },
    {image: 'img/Fananimation.png',
     title : 'Fan Animation',
     url : 'https://natoko.github.io/Fananimation/',
     sourcecode : 'https://github.com/natoko/Fananimation',
     detail: 'JavaScriptのcanvasを使用した扇風機のアニメーションです。',
     skill: 'HTML,CSS,JavaScript',
   },
    {image: 'img/Waveanimation.png',
     title : 'Wave Animation',
     url : 'https://natoko.github.io/Waveanimation/',
     sourcecode : 'https://github.com/natoko/Waveanimation',
     detail: 'JavaScriptのcanvasを使用した波と泡のアニメーションです',
     skill: 'HTML,CSS,JavaScript',
   },
  ];

  const worksList = document.getElementById('WorksList');
  const swiper_wrapper = document.querySelector('#WorksList > .swiper-wrapper');
  const swiper_slide = document.querySelector('#WorksList > .swiper-wrapper > .swiper-slide');

  class Product {
    //引数：img要素に入れる画像,listindex,imgを入れるリスト,imgを入れる箱,imgの数
    constructor(workimage,imgindex,imglist,imgbox,imgmax) {
      // img要素を入れる箱を作成
      this.product = imgbox.cloneNode(true);
      this.img = this.product.querySelector('img');
      // 作成したproduct要素を追加
      imglist.appendChild(this.product);
      this.setimg(workimage,imgindex);
      if (imgindex === (imgmax - 1)) {
        imglist.removeChild(imglist.querySelectorAll('.swiper-slide')[0]);
      }

      this.worksinfo =  document.getElementById('Worksinfo')
      this.template =  document.getElementById('template')

      this.img.addEventListener('click',() => {
        this.imgclick();
      });
    }

    imgclick() {
      if (this.img.parentNode.classList.contains('selected')) {
        hiding(this.worksinfo,(target)=>{
          this.resetchild(target);
          target.classList.add('hide');
        });
      } else{
        const imgindex = this.getindex(this.img);
        if (this.worksinfo.classList.contains('hide')) {
          this.setinfo(imgindex);
          showing(this.worksinfo,(target)=>{
            target.classList.remove('hide');
          });
        } else {
          const selectedprodust = worksList.querySelectorAll('.selected');
          selectedprodust[0].classList.remove('selected');
          this.resetchild(this.worksinfo);
          this.setinfo(imgindex);
        }
      }
      this.img.parentNode.classList.toggle('selected');
    }

    setimg(workimage,imgindex) {
      this.img.src = workimage.image;
      this.img.setAttribute('data-id',imgindex);
    };

    getindex(clickimg) {
      return clickimg.getAttribute('data-id');
    }

    setinfo(imgindex) {
      // templateをcopy
      const productinfo = this.template.cloneNode(true);
      // 各項目のNodeを取得
      const titlenode = productinfo.getElementsByClassName('product_title');
      const linknode = productinfo.querySelector('.product_link > a');
      const sorcenode = productinfo.querySelector('.product_sourcecode > a');
      const detailnode = productinfo.getElementsByClassName('product_detail');
      const skillnode = productinfo.getElementsByClassName('product_skill');
      // title,link,内容,skillをセット
      titlenode[0].textContent = works[imgindex].title;
      linknode.textContent = works[imgindex].url;
      linknode.href = works[imgindex].url;
      sorcenode.textContent = works[imgindex].sourcecode;
      sorcenode.href = works[imgindex].sourcecode;
      detailnode[0].textContent = works[imgindex].detail;
      skillnode[0].textContent = works[imgindex].skill;
      // id classをセット
      productinfo.id = 'showinfo';
      productinfo.classList.remove('hide');
      // templateの前にセット
      this.worksinfo.insertBefore(productinfo,this.template);
    }
    resetchild(worksinfo) {
      worksinfo.removeChild(worksinfo.querySelector('#showinfo'));
    }
  }


// animation function
// hide
  function hiding(target,func) {
    const hiding = target.animate([
      {transform: 'scale(1,1)'},
      {transform: 'scale(1,0)'},
    ],200)
    hiding.onfinish = () => {
      func(target);
    }
  }
// show
  function showing(target,func) {
    const showing = target.animate([
      {transform: 'scale(1,0)'},
      {transform: 'scale(1,1)'},
    ],200)
    showing.onfinish = func(target);
  }

  const products = [];

  for (var i = 0; i < works.length; i++) {
    products[i] = new Product(works[i],i,swiper_wrapper,swiper_slide,works.length);
  }

}
