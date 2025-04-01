package com.nanuri.rams.business.assessment.tb07.tb07200;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.nanuri.rams.business.common.dto.IBIMS900BDTO;
import com.nanuri.rams.business.common.vo.IBIMS900BVO;

@Service
public interface TB07200Service {

    public List<IBIMS900BVO> selectSpcList(IBIMS900BVO param);

} 
