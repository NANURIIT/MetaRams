package com.nanuri.rams.business.assessment.tb90.tb9040;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import com.nanuri.rams.business.common.dto.IBIMS997BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS820BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS997BMapper;
import com.nanuri.rams.com.security.AuthenticationFacade;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB9040ServiceImpl implements TB9040Service {

    private final IBIMS820BMapper ibims8202bMapper;
    private final IBIMS997BMapper ibims997bMapper;


    @Autowired
	private AuthenticationFacade facade;

    @Override
    public int insert(IBIMS997BDTO param) {

        int result = 0;

        IBIMS997BDTO data = ibims997bMapper.daemonCheckData("TB9040B");

        if(data == null){
            return result;
        }

        data.setJobStatus("1");
        ibims997bMapper.updateIBIMS997B(data);

        int confirmJobCount = data.getConfirmJobCount(); 
        if(confirmJobCount >= 1){
            result = 0;
            return result;
        }
        int delete;
        int insert;
        String stdrDt = data.getCurDate();

        //  삭제
        delete = ibims8202bMapper.deleteTB9040B(stdrDt);
        //  입력
        insert = ibims8202bMapper.insertTB9040B(stdrDt);

        //  체크
        if(delete >= 0 && insert >= 0 ){
            data.setJobStatus("2"); // complete
        }else {
            data.setJobStatus("3"); // error
        }
        ibims997bMapper.subPreJobCount(data);
        //  배치업데이트
        result = ibims997bMapper.batchUpdate(data);

        return result;
    };
    
}