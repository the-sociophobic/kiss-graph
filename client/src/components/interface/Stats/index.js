import React, { Component } from 'react'

import RadioHeader from 'components/interface/RadioHeader'
import Emoji from 'components/Emoji'
import StoreContext from 'libs/engines/data/store/StoreContext'
import UserNameLink from 'components/interface/UserNameLink'
import List from 'components/interface/List'
import { genderDetermined } from 'libs/engines/data/hardcoded/meta/namesRecognition'


class Stats extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  renderKisses = () => (
    <List
      items={this.context.store.get().nodes
        .filter(node => node.connections >= 2)
        .sort((a, b) => b.connections - a.connections)
        .map(node => [
          <UserNameLink
            user={node}
            setNode={this.props.setNode}
          />
        ])
      }
    />
  )

  renderMarriages = () => (
    <List
      items={this.context.store.get().nodes
        .filter(node => node.sposes.length > 0)
        .sort((a, b) => b.sposes.length - a.sposes.length)
        .map(node => [
          <UserNameLink
            prop="sposes"
            user={node}
            setNode={this.props.setNode}
          />
        ])
      }
    />
  )
  renderDates = () => (
    <List
      items={this.context.store.get().nodes
        .filter(node => node.date.length > 0)
        .sort((a, b) => b.date.length - a.date.length)
        .map(node => [
          <UserNameLink
            prop="date"
            user={node}
            setNode={this.props.setNode}
          />
        ])
      }
    />
  )
  renderBreakUps = () => (
    <List
      items={this.context.store.get().nodes
        .filter(node => node.breakup.length > 0)
        .sort((a, b) => b.breakup.length - a.breakup.length)
        .map(node => [
          <UserNameLink
            prop="breakup"
            user={node}
            setNode={this.props.setNode}
          />
        ])
      }
    />
  )
  renderDebated = () => (
    <List
      items={this.context.store.get().nodes
        .filter(node => node.debated.length > 0)
        .sort((a, b) => b.debated.length - a.debated.length)
        .map(node => [
          <UserNameLink
            prop="debated"
            user={node}
            setNode={this.props.setNode}
          />
        ])
      }
    />
  )

  renderIQ = () => (
    <List
      items={this.context.store.get().nodes
        .filter(node => node.iq)
        .map(node => ({
          ...node,
          iq: typeof node.iq === "string" ?
            node.iq :
            (node.iq + (node.iq2 || node.iq)) >> 1,
        }))
        .sort((a, b) => (typeof b.iq !== "number" ? 0 : b.iq) - (typeof a.iq !== "number" ? 0 : a.iq))
        .map(node => [
          <UserNameLink
            prop="IQ"
            user={node}
            setNode={this.props.setNode}
          />
        ])
      }
    />
  )

  renderMass = () => (
    <List
      items={this.context.store.get().nodes
        .filter(node => node.weight)
        .sort((a, b) => b.weight - a.weight)
        .map(node => [
          <UserNameLink
            prop="mass"
            user={node}
            setNode={this.props.setNode}
          />
        ])
      }
    />
  )
  renderHeight = () => (
    <List
      items={this.context.store.get().nodes
        .filter(node => node.height)
        .sort((a, b) => b.height - a.height)
        .map(node => [
          <UserNameLink
            prop="height"
            user={node}
            setNode={this.props.setNode}
          />
        ])
      }
    />
  )
  renderBMImale = () => (
    <List
      items={this.context.store.get().nodes
        .filter(node => node.bmim)
        .sort((a, b) => b.bmim - a.bmim)
        .map(node => [
          <UserNameLink
            prop="bmim"
            user={node}
            setNode={this.props.setNode}
          />
        ])
      }
    />
  )
  renderBMIfemale = () => (
    <List
      items={this.context.store.get().nodes
        .filter(node => node.bmif)
        .sort((a, b) => b.bmif - a.bmif)
        .map(node => [
          <UserNameLink
            prop="bmif"
            user={node}
            setNode={this.props.setNode}
          />
        ])
      }
    />
  )

  renderMentalDisorder = () => (
    <List
      items={this.context.store.get().nodes
        .filter(node => node.mentalDisorder)
        .sort((a, b) => (typeof b.mentalDisorder !== "number" ? 0 : b.mentalDisorder) - (typeof a.mentalDisorder !== "number" ? 0 : a.mentalDisorder))
        .map(node => [
          <UserNameLink
            prop="mentalDisorder"
            user={node}
            setNode={this.props.setNode}
          />
        ])
      }
    />
  )

  renderDead = () => (
    <List
      items={this.context.store.get().nodes
        .filter(node => node.dead)
        .sort((a, b) => b.connections - a.connections)
        .map(node => [
          <UserNameLink
            user={node}
            setNode={this.props.setNode}
          />
        ])
      }
    />
  )

  renderTriggered = () => (
    <List
      items={this.context.store.get().nodes
        .filter(node => node.offended)
        .sort((a, b) => b.connections - a.connections)
        .map(node => [
          <UserNameLink
            user={node}
            setNode={this.props.setNode}
          />
        ])
      }
    />
  )

  renderGay = () => (
    <List
      items={this.context.store.get().nodes
        .filter(node => node.gay)
        .sort((a, b) => b.gay - a.gay)
        .map(node => [
          <UserNameLink
            prop="gay"
            user={node}
            setNode={this.props.setNode}
          />
        ])
      }
    />
  )

  renderGenderless = () => (
    <List
      items={this.context.store.get().nodes
        .filter(node => !genderDetermined(node))
        .map(node => [
          <UserNameLink
            user={node}
            setNode={this.props.setNode}
          />
        ])
      }
    />
  )

  renderAttrMale = () => (
    <List
      items={this.context.store.get().nodes
        .filter(node => node.am)
        .sort((a, b) => b.am - a.am)
        .map(node => [
          <UserNameLink
            prop="am"
            user={node}
            setNode={this.props.setNode}
          />
        ])
      }
    />
  )
  renderAttrFemale = () => (
    <List
      items={this.context.store.get().nodes
        .filter(node => node.af)
        .sort((a, b) => b.af - a.af)
        .map(node => [
          <UserNameLink
            prop="af"
            user={node}
            setNode={this.props.setNode}
          />
        ])
      }
    />
  )

  render = () => (
    <RadioHeader
      buttons
      initialOptionFromURL
      affectURL
      prevURL="/stats/"
      options={{
        kisses: {
          label: () => <><Emoji.kiss /> kisses</>,
          content: () => this.renderKisses(),
          title: "Kiss Graph: Stats / kisses",
        },
        marriages: {
          label: () => <><Emoji.married /> marriages</>,
          content: () => this.renderMarriages(),
          title: "Kiss Graph: Stats / marriages",
        },
        dates: {
          label: () => <><Emoji.heart /> dates</>,
          content: () => this.renderDates(),
          title: "Kiss Graph: Stats / dates",
        },
        "break-ups": {
          label: () => <><Emoji.heartBroken /> break ups</>,
          content: () => this.renderBreakUps(),
          title: "Kiss Graph: Stats / break ups",
        },
        unrecognized: {
          label: () => <><Emoji.womanBan /> unrecognized kisses</>,
          content: () => this.renderDebated(),
          title: "Kiss Graph: Stats / unrecognized",
        },
        iq: {
          label: () => <><Emoji.IQ /> IQ</>,
          content: () => this.renderIQ(),
          title: "Kiss Graph: Stats / IQ",
        },
        mass: {
          label: () => <><Emoji.justice /> mass</>,
          content: () => this.renderMass(),
          title: "Kiss Graph: Stats / mass",
        },
        height: {
          label: () => <><Emoji.ruler /> height</>,
          content: () => this.renderHeight(),
          title: "Kiss Graph: Stats / height",
        },
        "body-mass-index-male": {
          label: () => <><Emoji.justice /><Emoji.ruler /><Emoji.male /> Body Mass Index male</>,
          content: () => this.renderBMImale(),
          title: "Kiss Graph: Stats / Body Mass Index male",
        },
        "body-mass-index-female": {
          label: () => <><Emoji.justice /><Emoji.ruler /><Emoji.female /> Body Mass Index female</>,
          content: () => this.renderBMIfemale(),
          title: "Kiss Graph: Stats / Body Mass Index female",
        },
        "mental-disorder": {
          label: () => <><Emoji.mentalDisorder /> mental disorder</>,
          content: () => this.renderMentalDisorder(),
          title: "Kiss Graph: Stats / mental disorders",
        },
        triggered: {
          label: () => <><Emoji.triggered /> triggered</>,
          content: () => this.renderTriggered(),
          title: "Kiss Graph: Stats / triggered",
        },
        gay: {
          label: () => <><Emoji.gay /> gay</>,
          content: () => this.renderGay(),
          title: "Kiss Graph: Stats / gay",
        },
        dead: {
          label: () => <><Emoji.dead /> dead</>,
          content: () => this.renderDead(),
          title: "Kiss Graph: Stats / dead",
        },
        // genderless: {
        //   label: () => <><Emoji.gay /></>,
        //   content: () => this.renderGenderless(),
        //   title: "Kiss Graph: Stats / genderless",
        // },
        "most-fertile-males": {
          label: () => <><Emoji.gene /><Emoji.winner /><Emoji.male /> most fertile males</>,
          content: () => this.renderAttrMale(),
          title: "Kiss Graph: Stats / most fertile males",
        },
        "most-fertile-females": {
          label: () => <><Emoji.gene /><Emoji.winner /><Emoji.female /> most fertile females</>,
          content: () => this.renderAttrFemale(),
          title: "Kiss Graph: Stats / most fertile females",
        },
      }}
    />
  )
}
Stats.contextType = StoreContext
export default Stats