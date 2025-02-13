package com.nanuri.rams.business.assessment.tb10.tb10610;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.IBIMS997BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB10610S")
@RequiredArgsConstructor
@RestController
public class TB10610APIController {

    private final TB10610Service tb10610svc;

    // 배치 스케줄러 모니터링 조회
    @PostMapping("/inqBatch")
    public IBIMS997BVO inqBatch(@RequestBody IBIMS997BVO input) {
        return tb10610svc.inqBatch(input);
    }
    
    // 배치 스케줄러 모니터링 실행
    @PostMapping("/excBatch")
    public int excBatch(@RequestBody IBIMS997BVO input) {
        return tb10610svc.excBatch(input);
    }

    // 배치 스케줄러 모니터링 초기화
    @PostMapping("/resetBatch")
    public int resetBatch(@RequestBody IBIMS997BVO input) {
        return tb10610svc.resetBatch(input);
    }

    // 배치 스케줄러 모니터링 confirm 수정
    @PostMapping("/updateConfirm")
    public int updateConfirm(@RequestBody IBIMS997BVO input) {
        return tb10610svc.updateConfirm(input);
    }
    
    // Forced-OK
    @PostMapping("/forcedOktask")
    public boolean killtask() {
    	return tb10610svc.killtask();
    }
}