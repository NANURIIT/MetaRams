package com.nanuri.rams.business.assessment.tb08.tb08090;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS800BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS800BMapper;
import com.nanuri.rams.business.common.vo.IBIMS800BVO;
import com.nanuri.rams.business.common.vo.TB08090SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB08090ServiceImpl implements TB08090Service {
    
    private final IBIMS800BMapper ibims800bMapper;
    // private final IBIMS201BMapper ibims201bMapper;

    @Override
    public List<IBIMS800BVO> getAsstSnnGrdList(IBIMS800BVO param){
        List<IBIMS800BVO> returnList = new ArrayList<IBIMS800BVO>();

        int isExist = ibims800bMapper.checkStdrDtInfo(param.getStdrDt());

        if(isExist < 1){        //기준일자 데이터 없으면
            log.debug("#####IBIMS800B 기준일자 데이터 없음#####");

            returnList = ibims800bMapper.getAsstSnnGrdListNoStdrDt();
        }else{                  //기준일자 데이터 있으면
            log.debug("#####IBIMS800B 기준일자 데이터 있음#####");
            returnList = ibims800bMapper.getAsstSnnGrdListStdrDt(param.getStdrDt());
        }

        return returnList; 
    }

    @Override
    public int saveAsstSnnList(TB08090SVO param){

        int result = 0;

        String stdrDt = param.getStdrDt();
        List<IBIMS800BDTO> paramList = param.getIbims800bDTOList();

        //log.debug("stdrDt: " + stdrDt);
        //log.debug("paramList{}", paramList);

        int isExist = ibims800bMapper.checkStdrDtInfo(stdrDt);

        if(isExist < 1){            //기준일자 데이터 없으면
            log.debug("###########기준일자 데이터 없음###########");
        }else{                      //기준일자 데이터 있으면
            log.debug("###########기준일자 데이터 있음###########");
            int bfDlt = ibims800bMapper.dltAsstSnnList(param);
        }

        result = ibims800bMapper.insertAsstSnnList(paramList);
        
        return result;
    }
}
