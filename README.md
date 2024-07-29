**关于**

该项目旨在实现自动化通过 Cloudflare Turnstile 质询，无需人工干预即可完成验证

**请求示例**

```
GET http://127.0.0.1:3000/api?target=https://iruko.org/captcha
```

**返回示例**

```
{
    "title": "页面没有找到-Iruko的小站",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "cookie": "cf_clearance=MHcI0vjPgnMzNpoGzOCFZ1AMCe322N2_EgTmddtgVyw-1715253876-1.0.1.1-w6HYChkfY9uJgY0G6nymjUMJhTb8IFJCD2wu1JC8_GfDWO_kXd0pP_fcKStObsKxWIlB6hede72pc1EIPV9J6g"
}
```

![1](https://raw.githubusercontent.com/Iruko233/CAPTCHA-Solver/main/1.png)
![2](https://raw.githubusercontent.com/Iruko233/CAPTCHA-Solver/main/2.png)
![3](https://raw.githubusercontent.com/Iruko233/CAPTCHA-Solver/main/3.png)
