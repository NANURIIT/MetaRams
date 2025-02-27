package com.nanuri.rams.business.assessment.tb90.tb9070;

import com.nanuri.rams.business.common.dto.IBIMS997BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS436BMapper;
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

    @Override
    public String insert(IBIMS997BDTO param) {
        String returnVal = "5";

        try {
            IBIMS810BVO ibims810bvo = new IBIMS810BVO();
            List<IBIMS810BVO> resultList = ibims436BMapper.getOvduList(ibims810bvo);
            List<IBIMS436BVO> mergeList = new ArrayList<>();

            if (resultList != null) {
                for (IBIMS810BVO result : resultList) {
                    IBIMS436BVO converted = new IBIMS436BVO();
                    converted.setDealNo(result.getDealNo());
                    converted.setPrdtCd(result.getPrdtCd());
                    converted.setExcSn(result.getExcSn());
                    mergeList.add(converted);
                }
            }

            log.info("[DEBUG] MERGE 대상 건수: {}", mergeList.size());

            if (!mergeList.isEmpty()) {
                ibims436BMapper.batchInsert(mergeList); // MERGE 실행
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

        return returnVal;
    }
}