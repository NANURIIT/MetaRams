package com.nanuri.rams.business.assessment.tb07.tb07140;

import java.util.List;

import org.springframework.stereotype.Service;
import com.nanuri.rams.business.common.dto.IBIMS407BDTO;
import com.nanuri.rams.business.common.vo.IBIMS407BVO;

@Service
public interface TB07140Service {

	public List<IBIMS407BVO> getFincList(IBIMS407BDTO paramData);

	public int insertFinc(IBIMS407BDTO paramData);

	public int updateFinc(IBIMS407BDTO paramData);

	public int deleteFinc(IBIMS407BDTO paramData);

}
