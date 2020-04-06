import React, { Component } from 'react'

import ExternalLink from 'components/ExternalLink'

import myDate from 'libs/utils/myDate'
import countable from 'libs/utils/countable'

import StoreContext from 'libs/engines/data/store/StoreContext'

class About extends Component {
  constructor(props) {
    super(props)

    this.memeDate = new myDate(new Date('2018-04-01T20:48:00'), "RU")
    this.siteDate = new myDate(new Date('2019-07-13T01:21:24'), "RU")

    this.state = {
      memeDateString: this.memeDate.pastCounterShort(),
      siteDateString: this.siteDate.pastCounterShort(),
    }

    setInterval(() => this.setState({
      memeDateString: this.memeDate.pastCounterShort(),
      siteDateString: this.siteDate.pastCounterShort(),
    }), 1000)
  }

  static contextType = StoreContext

  render() {
    const articles = [
      {
        title: "Зачем всё это?",
        text: <p className="p">Этот сайт о Любви! Самые волнительные моменты людей со всего Мира запечатлены на интерактивном психоделическом полотне.<br />
        Со временем тут появится больше возможностей для визуализации мыслей чувств и событий. Вы можете следить за разработкой в <ExternalLink newWindow to="https://t.me/Nihilist_R4VE">моём Telegram-канале</ExternalLink>. Если вам нравится сайт, присылайте <ExternalLink newWindow to="/donations">донаты</ExternalLink> и <ExternalLink newWindow to="/btc">биткоины</ExternalLink>. Если у вас есть пожелания, предложения, комментарии, воспользуйтесь <ExternalLink newWindow to="https://forms.gle/i8NxcaSA94SvJXhr9">формой обратной связи</ExternalLink>.</p>,
      },
      {
        title: "Как возник сайт?",
        text: <p className="p">Всё началось с <ExternalLink newWindow to="https://vk.com/wall-132153534?offset=60&own=1&w=wall-132153534_1352">этого поста</ExternalLink> в <ExternalLink newWindow to="https://vk.com/ateist_r4ve">паблике с локальными мемами</ExternalLink> 1 апреля 2018 года. Мне нравилось создавать манипулятивные мемы: простая картинка в интернете может спровоцировать разнообразные переплетенные цепочки событий в "реальном мире". Этот мем оказался невероятно живучим: мне постоянно присылали все больше и больше информации! В итоге, Я решил оформить её в виде сайта.</p>,
      },
      {
        title: "Это всё неправильно (раздел для озабоченых граждан)",
        text: <p className="p">Автор придерживается <ExternalLink newWindow to="https://www.youtube.com/watch?v=CKQHltD3Lyk">либертарианских этических принципов</ExternalLink><br />
        Иными словами, все действия и слова, которые не наносят вред чужой жизни и имуществу — не являются плохими. Любые отступления от данного правила оправдывают цензуры и репресивные законы об оскорблении чувств. Данный сайт — всего лишь сборник непроверенной информации: он не угрожает ничьей жизни и не ворует чужие деньги, т.е. в нём нет ничего аморального. Если вы, тем не менее, обеспокоены свободой слова, можете воспользоваться <ExternalLink newWindow to="https://forms.gle/i8NxcaSA94SvJXhr9">формой обратной связи</ExternalLink>.</p>,
      },
    ]

    const {nodes, edges} = this.context.store.get()
    
    return (
      <div className="about-container">
        <p className="p">
          {this.state.memeDateString} с первой публикации мема<br />
          {this.state.siteDateString} с публикации сайта<br />
          {countable(nodes.length, ["человек", "человека", "человек"])} на графе<br />
          {countable(edges.length, ["связь", "связи", "связей"])} на графе<br />
          {countable(nodes.filter(node => node.offended).length, ["человек заявил", "человека заявили", "человек заявили"])} об оскорблении чувств<br />
          {countable(nodes.filter(node => node.dead).length, ["человек мёртв", "человека мертвы", "человек мертво"])}<br /><br />
        </p>
        {articles.map(article => (
          <article className="article">
            <h3 className="h3">{article.title}</h3>
            {article.text}
          </article>
        ))}
      </div>
    )
  }
}

export default About
