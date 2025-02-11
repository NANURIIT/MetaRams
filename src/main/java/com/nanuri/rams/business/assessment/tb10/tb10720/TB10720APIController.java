package com.nanuri.rams.business.assessment.tb10.tb10720;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.IBIMS998BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB10720S")
@RequiredArgsConstructor
@RestController
public class TB10720APIController {

    private final TB10720Service tb10720svc;

    // 마감기본 영업일 기준 조회
    @PostMapping("/selectTB10720S")
    public IBIMS998BVO selectTB10720S(@RequestBody IBIMS998BVO input) {
        return tb10720svc.selectTB10720S(input);
    }
    
    // 마감관리 개시/마감 실행
    @PostMapping("/updateTB10720S")
    public int updateTB10720S(@RequestBody IBIMS998BVO input) {
        return tb10720svc.updateTB10720S(input);
    }
    
    // 배치 스케줄러 실행
    @PostMapping("/startBatchScheduler")
    public void startBatchScheduler() {
        tb10720svc.startBatchScheduler();
    }
    
    // 배치 스케줄러 중지
    @PostMapping("/stopBatchScheduler")
    public void stopBatchScheduler() {
        tb10720svc.stopBatchScheduler();
    }
    
    // 일일업무개시 잡 실행
    @PostMapping("/runBatchJob")
    public void runBatchJob() throws Exception {
        tb10720svc.runBatchJob();
    }
    
}