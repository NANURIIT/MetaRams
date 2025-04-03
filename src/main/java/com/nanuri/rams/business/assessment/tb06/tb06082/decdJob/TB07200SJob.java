package com.nanuri.rams.business.assessment.tb06.tb06082.decdJob;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS902BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS902BMapper;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB07200SJob {

	private final AuthenticationFacade facade;

    private final IBIMS902BMapper ibims902bMapper;

    /**
     * 승인시 딜잔액계산
     */
    public boolean updateRndrBlce (String param) {
        // 잔액계산된 리스트
        List<IBIMS902BDTO> dto = ibims902bMapper.calcBlceList(param);

        // 계산된 리스트 업데이트
        for (int i = 0; i < dto.size(); i++) {
            dto.get(i).setHndEmpno(facade.getDetails().getEno());
            int result = ibims902bMapper.updateRndrBlce(dto.get(i));
            if (result != 1) {
                return false;
            }
        }
        return true;
    }

}
