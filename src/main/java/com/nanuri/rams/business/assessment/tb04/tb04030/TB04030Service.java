package com.nanuri.rams.business.assessment.tb04.tb04030;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS103BVO;
import com.nanuri.rams.business.common.vo.TB04020SVO;

@Service
public interface TB04030Service {

	public List<IBIMS103BVO> assignmentSearch(TB04020SVO param);

}
