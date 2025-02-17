package com.nanuri.rams.business.assessment.tb10.tb10510;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS995BDTO;
import com.nanuri.rams.business.common.vo.IBIMS995BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB10510S")
@RequiredArgsConstructor
@RestController
public class TB10510APIController {

    private final TB10510Service tb10510svc;

    // 배치 스케줄러 관리 조회
    @PostMapping("/inqBatch")
    public IBIMS995BVO inqBatch(@RequestBody IBIMS995BDTO input) {
        return tb10510svc.inqBatch(input);
    }

    // 배치 스케줄러 관리 등록
    @PostMapping("/rgstBatch")
    public int rgstBatch(@RequestBody IBIMS995BVO input) {
        return tb10510svc.rgstBatch(input);
    }
    
    // 배치 스케줄러 관리 실행
    /*@PostMapping("/excBatch")
    public int excBatch(@RequestBody IBIMS995BVO input){
        return tb10510svc.excBatch(input);
    }*/

    // 배치 스케줄러 관리 실행
    @PostMapping("/excBatch")
    public void excBatch(@RequestBody IBIMS995BVO input){
    	tb10510svc.batchExecuteService(input);
    }

    // 배치 스케줄러 관리 삭제
    @PostMapping("/delBatch")
    public int delBatch(@RequestBody IBIMS995BVO input) {
        return tb10510svc.delBatch(input);
    }
    
    // 배치 스케줄러 상태확인
    @PostMapping("/isBatchScheduler")
    public boolean isBatchScheduler() {
    	return tb10510svc.isBatchScheduler();
    }
    
    // 배치 스케줄러 실행
    @PostMapping("/startBatchScheduler")
    public boolean startBatchScheduler() {
    	return tb10510svc.startBatchScheduler();
    }
    
    // 배치 스케줄러 중지
    @PostMapping("/stopBatchScheduler")
    public boolean stopBatchScheduler() {
    	return tb10510svc.stopBatchScheduler();
    }
    
}
