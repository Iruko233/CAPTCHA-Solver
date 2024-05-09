**关于**

该项目旨在实现自动化通过 Cloudflare Turnstile 质询，无需人工干预即可完成验证

**请求示例**

```
GET http://127.0.0.1:3000/api?target=目标
```

**返回示例**

```
{
    "title": "页面没有找到-Iruko的小站",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "cookie": "cf_clearance=MHcI0vjPgnMzNpoGzOCFZ1AMCe322N2_EgTmddtgVyw-1715253876-1.0.1.1-w6HYChkfY9uJgY0G6nymjUMJhTb8IFJCD2wu1JC8_GfDWO_kXd0pP_fcKStObsKxWIlB6hede72pc1EIPV9J6g"
}
```

![1](https://raw.githubusercontent.com/Iruko233/CAPTCHA-Solver/main/photo_1_2024-05-09_17-56-58.jpg)
![2](https://raw.githubusercontent.com/Iruko233/CAPTCHA-Solver/main/photo_2_2024-05-09_17-56-58.jpg)
![3](https://raw.githubusercontent.com/Iruko233/CAPTCHA-Solver/main/photo_3_2024-05-09_17-56-58.jpg)

**未来计划：**
- 添加自定义代理支持
- 添加Cdnfly全系验证码支持(已完成待开源)