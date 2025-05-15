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
    
    //조회
    @Override
    public TEST101BVO getDealDetail (TEST101BDTO test101bdto) {
        TEST101BVO test101bvo = test101bmapper.getDealDetail(test101bdto);
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
        //log.debug("vo 체크 : " , test101bvo);

        // log

    }
}
