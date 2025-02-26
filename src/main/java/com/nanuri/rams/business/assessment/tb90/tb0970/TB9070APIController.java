package com.nanuri.rams.business.assessment.tb90.tb0970;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/TB9070B")
@RequiredArgsConstructor
public class TB9070APIController {

    private final TB9070Service tb9070Service;


    // ✅ 2. 실행 메서드 호출 API (POST 요청)
    @PostMapping("/execute")
    public ResponseEntity<String> executeService() {
        tb9070Service.insertOvduList();
        return ResponseEntity.ok("TB9070 서비스 실행 완료!");
    }
}
