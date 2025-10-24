Netlify
====

Netlify project
https://app.netlify.com/projects/sakuteru/overview


お名前.comで取得したドメインをNetlifyに設定
https://takayyz.com/blog/configure-customdomain-on-netlify/


ネームサーバー
dns1.p02.nsone.net
dns2.p02.nsone.net
dns3.p02.nsone.net
dns4.p02.nsone.net

NetlifyのURL
https://sakuteru.netlify.app/


https://sakuteru.com


nslookup  -type=ns sakuteru.com
```
Server:         127.0.0.53
Address:        127.0.0.53#53

Non-authoritative answer:
sakuteru.com    nameserver = dns3.p02.nsone.net.
sakuteru.com    nameserver = dns4.p02.nsone.net.
sakuteru.com    nameserver = dns1.p02.nsone.net.
sakuteru.com    nameserver = dns2.p02.nsone.net.
```

dig sakuteru.com +short
dig sakuteru.com +noall +answer -t A
dig www.sakuteru.com +nostats +nocomments +nocmd
dig sakuteru.com
dig www.sakuteru.com