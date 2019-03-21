import htmlToText from 'html-email-to-text'
import nodemailer from 'nodemailer'
import inline from 'inline-css'
import moment from 'moment'
import ses from './ses'
import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const emailPath = path.join(__dirname, '..', 'emails')

export const sendMail = async (email) => {

  const templates = {
    content: fs.readFileSync(path.join(emailPath, `${email.template}.ejs`), 'utf8'),
    envelope: fs.readFileSync(path.join(emailPath, 'envelope.ejs'), 'utf8')
  }

  const data = {
    ...email.data,
    moment,
    web_host: process.env.WEB_HOST
  }

  const content = ejs.render(templates.content, data)

  const rendered = ejs.render(templates.envelope, { ...data, content})

  const html = await inline(rendered, {
    url: process.env.WEB_HOST,
    removeStyleTags: false
  })

  const transporter = _getTransporter()

  try {

    await transporter.sendMail({
      to: process.env.EMAIL_REDIRECT || email.to,
      from: process.env.EMAIL_FROM,
      subject: email.subject,
      html,
      text: htmlToText(html)
    })

  } catch(err) {

    console.log(err)

    return { error: err.message }

  }

}

const _getTransporter = () => {

  if(process.env.EMAIL_TRANSPORT === 'sendmail') {

    return nodemailer.createTransport({
      sendmail: true,
      newline: 'unix',
      path: '/usr/sbin/sendmail'
    })

  } else if(process.env.EMAIL_TRANSPORT === 'ses') {

    return nodemailer.createTransport({
      SES: ses
    })

  }

}
