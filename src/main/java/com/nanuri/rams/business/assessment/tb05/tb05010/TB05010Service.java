package com.nanuri.rams.business.assessment.tb05.tb05010;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS103BDTO;
import com.nanuri.rams.business.common.dto.IBIMS111BDTO;
import com.nanuri.rams.business.common.dto.IBIMS112BDTO;
import com.nanuri.rams.business.common.dto.IBIMS115BDTO;
import com.nanuri.rams.business.common.vo.IBIMS103BVO;
import com.nanuri.rams.business.common.vo.IBIMS111BVO;
import com.nanuri.rams.business.common.vo.IBIMS112BVO;
import com.nanuri.rams.business.common.vo.IBIMS115BVO;
import org.springframework.stereotype.Service;

@Service
public interface TB05010Service {

	// 마지막 협의정보 검색
	public IBIMS111BVO getLastCNFRNCInfo(IBIMS111BDTO paramData);

	// 협의정보 - 리스트 검색
	public List<IBIMS111BVO> getCNFRNCList(IBIMS111BDTO paramData);

	// 협의정보 - 기본정보 검색
	public IBIMS111BVO getCNFRNCInfo(IBIMS111BDTO paramData);

	// 협의정보 - 위원정보 검색
	public List<IBIMS115BVO> getMMBRInfo(IBIMS115BDTO paramData);

	// 협의정보 - 안건정보 검색
	public List<IBIMS112BVO> getCaseInfo(IBIMS112BDTO paramData);

	// 협의정보 - 안건정보 추가
	IBIMS103BVO getDealDetail(IBIMS103BDTO paramData);

	// 임시저장 - 기본정보, 안건정보, 위원정보
	public int tempSaveComtInfo(IBIMS111BDTO paramData);

	// 준비확정 or 준비취소
	public int changeCNFRNCStatus( IBIMS111BDTO paramData);

}
