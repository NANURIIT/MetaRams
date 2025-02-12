package com.nanuri.rams.business.assessment.tb07.tb07160;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS401BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS201BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS401BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS401HMapper;
import com.nanuri.rams.business.common.vo.IBIMS401BVO;
import com.nanuri.rams.business.common.vo.TB07160SVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB07160ServiceImpl implements TB07160Service{

    private final IBIMS201BMapper ibims201bMapper;
    private final IBIMS401BMapper ibims401BMapper;
    private final IBIMS401HMapper ibims401HMapper;
    private final AuthenticationFacade facade;

    @Override
    public TB07160SVO getTrrcInf(TB07160SVO param){
        //log.debug("paramCheck!!!!!");
        return ibims201bMapper.getTrrcInf(param.getPrdtCd());
    }

    @Override
    public int trrcRgst(TB07160SVO param){
        int rslt = 0;

        IBIMS401BDTO in401bdto = new IBIMS401BDTO();
        in401bdto.setPrdtCd(param.getPrdtCd());
		IBIMS401BVO out401bdto = ibims401BMapper.getIBIMS401BBaseInfo(in401bdto);

        if(out401bdto == null) {
            ;
        } else {
            out401bdto.setChrrEmpno(param.getChrrEmpno());
            // out401bdto.setFrsMngmBdcd(param.getMngmBdcd()); 	// 최초관리부서
            out401bdto.setMngmBdcd(param.getMngmBdcd()); 		// 관리부서
            out401bdto.setTrrcDt(param.getTrrcDt());            // 이수관일자
            out401bdto.setHndEmpno(facade.getDetails().getEno());
            rslt = ibims401BMapper.updateIBIMS401B(out401bdto);
            rslt = ibims401HMapper.insertIBIMS401H(out401bdto);
        }

        return rslt;
    }
    
}
