/* eslint-disable */

import axios from 'axios';

/* axios config */
// axios.defaults.baseURL = process.env.REACT_APP_API_DOMAIN + '/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.withCredentials = true;

if (process.env.REACT_APP_STAGE === 'live' || process.env.REACT_APP_STAGE === 'prod') {
  // console.log("site analytics scripts running")

  // const googleAnalytics = document.createElement("script");
  // googleAnalytics.src = "https://www.googletagmanager.com/gtag/js?id=G-XB8NCSJJSE"
  // googleAnalytics.innerHTML = `
  //   <!-- Global site tag (gtag.js) - Google Analytics -->
  //   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XB8NCSJJSE"></script>
  //   <script>
  //     window.dataLayer = window.dataLayer || [];
  //     function gtag(){dataLayer.push(arguments);}
  //     gtag('js', new Date());

  //     gtag('config', 'G-XB8NCSJJSE');
  //   </script>
  // `;
  // document.head.appendChild(googleAnalytics);

  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
  (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

  ym(54942766, "init", {
      clickmap:true,
      trackLinks:true,
      accurateTrackBounce:true
  });
}
