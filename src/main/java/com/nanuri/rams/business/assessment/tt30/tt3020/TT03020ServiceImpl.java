package com.nanuri.rams.business.assessment.tt30.tt3020;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.nanuri.rams.business.common.mapper.TEST101BMapper;
import com.nanuri.rams.business.common.dto.TEST101BDTO;
import com.nanuri.rams.business.common.vo.TEST101BVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TT03020ServiceImpl implements TT03020Service {
    
    private final TEST101BMapper test101bmapper;
	private final AuthenticationFacade facade;      // 사용자정보

    
    //조회
    @Override
    public TEST101BVO getDealInfo (TEST101BDTO test101bdto) {
        TEST101BVO test101bvo = test101bmapper.getDealInfo(test101bdto);
        // log.debug("임플 체크");
        // TEST101BVO test101bvo = new TEST101BVO();
        log.debug("test101bvo ::: " + test101bvo);

        // 빈값이 없을때 vo에 추가?
        if (test101bvo == null  ) {
            log.debug("여기탔나?????");
            return test101bvo = new TEST101BVO();
        }
        else {
            return test101bvo;
        }
    }

    // 저장(insert)
    @Override
    public String saveDealInfo(TEST101BDTO test101bdto) {
        log.debug("서비스 임플 탔음!!");


        /*
         * 1. 파라미터 세팅하기
         * 2. 채번
         */

        //  2. 채번(조작사원번호)
        test101bdto.setHndEmpno(facade.getDetails().getEno());
        log.debug("hndEmpno ::: " + facade.getDetails().getEno());


        
        return null;
    }

}
