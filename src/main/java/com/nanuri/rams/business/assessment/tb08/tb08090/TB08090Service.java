package com.nanuri.rams.business.assessment.tb08.tb08090;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS800BVO;
import com.nanuri.rams.business.common.vo.TB08090SVO;

@Service
public interface TB08090Service {

    //자본건전성 조회
    public List<IBIMS800BVO> getAsstSnnGrdList(IBIMS800BVO param);

    //자본건전성 저장
    public int saveAsstSnnList(TB08090SVO param);
    
}
