package com.example.demo.controller;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.service.DemoService;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.ParseException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Controller
public class DemoController {


    @Autowired
    DemoService demoService;


    @RequestMapping("/demo")
    @ResponseBody
    public String demo(HttpServletRequest request) {
        String secret = "de0095c6871dfda0da7acd3d539ab729";
        String appid = "wx1a1d4caf81442252";
        String env = "wshyun-4mvua";
        String cloudNameadddata = "subscribe";
        String cloudNamesend = "send";
        String url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appid + "&secret=" + secret;
        HttpMethod method = HttpMethod.GET;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();

//        需要传递过去的告警信息阿松大
        Map<String, Object> datamap = new HashMap<String, Object>();
        JSONObject thing2json = new JSONObject();
        thing2json.put("value", "云开发接入订阅消息提醒aa");
        JSONObject time5json = new JSONObject();
        time5json.put("value", "2019-10-22");
        JSONObject thing3json = new JSONObject();
        thing3json.put("value", "一级");
        JSONObject thing4json = new JSONObject();
        thing4json.put("value", "云开发接入订阅消息提醒aa");
        JSONObject thing6json = new JSONObject();
        thing6json.put("value", "云开发接入订阅消息提醒aa");

        JSONObject messagejson = new JSONObject();
        messagejson.put("thing2", thing2json);
        messagejson.put("time5", time5json);
        messagejson.put("thing3", thing3json);
        messagejson.put("thing4", thing4json);
        messagejson.put("thing6", thing6json);


        JSONObject message = new JSONObject();
        message.put("data", messagejson);
        message.put("templateId", "jNKRC6ZWmnaCnJqC_AlLLbQpIZDD5PO5P9ivh-nXiRk");
        message.put("companynum", "jhjc");


//        将获取的token提取出来
        JSONObject jsonObject = JSONObject.parseObject(demoService.client(url, method, params));
        Map<String, Object> map = (Map<String, Object>) jsonObject;
        String access_token = (String) map.get("access_token");


//调用云函数的url阿三大苏打
        String INVOKE_CLOUD__URL_ADDDATA = "https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=" + access_token + "&env=" + env + "&name=" + cloudNameadddata;
        return demoService.client111(INVOKE_CLOUD__URL_ADDDATA, method, headers, message);
    }


}








