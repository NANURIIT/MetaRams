package com.nanuri.rams.business.assessment.tb90.tb9070;

import com.nanuri.rams.business.common.dto.IBIMS997BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS436BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS997BMapper;
import com.nanuri.rams.business.common.vo.IBIMS436BVO;
import com.nanuri.rams.business.common.vo.IBIMS810BVO;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB9070ServiceImpl implements TB9070Service {

    private final IBIMS436BMapper ibims436BMapper;
    private final IBIMS997BMapper ibims997bMapper;

    @Override
    public String insert(IBIMS997BDTO param) {

        // 배치시작일자
        param.setHndEmpno("BATCH");
        ibims997bMapper.updateIBIMS997B(param);
        
        String returnVal = "5";
        
        //일별연체내역생성 서비스 시작
        
        try {
            // 일별잔액테이블에서 연체내역 조회
            IBIMS810BVO ibims810bvo = new IBIMS810BVO();
            List<IBIMS810BVO> resultList = ibims436BMapper.getOvduList(ibims810bvo);

            if (resultList != null && !resultList.isEmpty()) {  
                for (IBIMS810BVO result : resultList) {
                    int affectedRows = ibims436BMapper.batchInsert(result);  /** 적용된 행 개수 반환 */
                    System.out.println("적용된 행 수: " + affectedRows);
                }
            } 

      
            // complete
            returnVal = "4";

        } catch (Exception e) {
            if (e instanceof InterruptedException) {
                log.info("스레드 중단 오류 발생!!");
                // terminated
                returnVal = "7";
            } else {
                log.info("배치중 오류 발생!!", e);
                // error
                returnVal = "5";
            }
        }
        
        //배치종료시간
        ibims997bMapper.batchUpdate(param);
        ibims997bMapper.subPreJobCount(param);

        return returnVal;
    }
}