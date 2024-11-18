package com.nanuri.rams.business.assessment.tb9999d;

import java.net.URI;
import java.util.concurrent.CountDownLatch;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.nanuri.rams.business.common.dto.IBIMS997BDTO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class URLController {

    private final RestTemplate restTemplate;

    public URLController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void callApi(URI apiUrl, IBIMS997BDTO request, CountDownLatch latch) {
        // restTemplate.postForEntity(apiUrl, requestBody, String.class);
        try {
            ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, request, String.class);
            log.info("API 호출 성공, 상태 코드: {}, 응답: {}", response.getStatusCode(), response.getBody());
        } catch (Exception e) {
            log.error("API 호출 중 오류 발생: {}", e.getMessage(), e);
        } finally {
            latch.countDown(); // 작업이 완료되었음을 알림

        }
    }

}
