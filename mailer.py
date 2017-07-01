# encoding=utf8

import smtplib
from email.MIMEMultipart import MIMEMultipart
from email.MIMEText import MIMEText


class Mailer:

    def send(self,toaddr,subj,html):

        try:
            fromaddr = 'sarah.sharpe1994@gmail.com'
            msg = MIMEMultipart()
            msg['From'] = fromaddr
            msg['To'] = ", ".join(toaddr)
            msg['Subject'] = subj
            msg.attach(MIMEText(html.encode('utf-8'), 'html','utf-8'))
            server = smtplib.SMTP('smtp-relay.gmail.com', 587)
            server.starttls()
            server.login(fromaddr, "yogilytics")
            text = msg.as_string()
            server.sendmail(fromaddr, toaddr, text)
            server.quit()
        except:
            pass


    def sendEmail(self,toaddr,subj,html):
        self.send(toaddr,subj,html)
