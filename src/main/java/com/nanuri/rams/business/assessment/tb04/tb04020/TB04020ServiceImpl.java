package com.nanuri.rams.business.assessment.tb04.tb04020;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS103BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS100BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS103BMapper;
import com.nanuri.rams.business.common.vo.IBIMS100BVO;
import com.nanuri.rams.business.common.vo.IBIMS103BVO;
import com.nanuri.rams.business.common.vo.TB04020SVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB04020ServiceImpl implements TB04020Service {

	private final IBIMS103BMapper ibims103bMapper;
	private final IBIMS100BMapper ibims100bMapper;

	@Autowired
	private AuthenticationFacade facade;

	/* IBIMS100B INSERT와 UPDATE를 위한 VO 인스턴스화 */
	IBIMS100BVO.selectVO ibims100BVO = new IBIMS100BVO.selectVO();

	// 심사안건조회
	@Override
	public List<IBIMS103BVO> checkDealSearch(TB04020SVO dealInfo) {
		return ibims103bMapper.checkDealSearch(dealInfo);
	}

	// 심사안건 접수
	@Override
	public int receiptDeal(IBIMS103BDTO param) {

		IBIMS103BDTO temp = ibims103bMapper.selectOne103B(param);

		temp.setOwnPEno(param.getOwnPEno());							// 심사역
		temp.setOwnDt(param.getOwnDt());								// 접수배정일
		temp.setRiskInspctRsltnCcd(param.getRiskInspctRsltnCcd());		// 리스크심사결의구분코드
		temp.setMtrPrgSttsDcd(param.getMtrPrgSttsDcd());				// 심사진행상태코드
		temp.setHndEmpno(facade.getDetails().getEno());					// 조작사원번호

		param.setLastYn("N");
		ibims103bMapper.updateLastYn(param);

		/* IBIMS100B INSERT */
		ibims100BVO.setEmpno(facade.getDetails().getEno());					// 사원번호
		ibims100BVO.setWorkDcd("03");                              			// 작업구분코드
		ibims100BVO.setWorkCtns("(To-Do) 접수관리 및 담당자 배정");         // 작업내용
		ibims100BVO.setRgstEmpno(facade.getDetails().getEno());             // 등록사원번호
		ibims100BVO.setMenuId("/TB04020S");                               	// 메뉴ID
		ibims100BVO.setEntpNm(param.getEntpNm());                           // 업체명
		ibims100BVO.setRmrk("dealNo=" + param.getDealNo());                 // 비고(메뉴별조회KEY)
		ibims100BVO.setHndEmpno(facade.getDetails().getEno());              // 조작사원번호

		ibims100bMapper.insertIBIMS100BInfo(ibims100BVO);

		return ibims103bMapper.insert103B(temp);
	}

	// 심사안건 반송
	@Override
	public int returnDeal(IBIMS103BDTO param) {

		IBIMS103BDTO temp = ibims103bMapper.selectOne103B(param);

		temp.setMtrPrgSttsDcd(param.getMtrPrgSttsDcd());				// 심사진행상태코드
		temp.setOwnPEno(param.getOwnPEno()); // 심사역
		temp.setOwnDt(param.getOwnDt());//접수배정일
		temp.setRiskInspctRsltnCcd(param.getRiskInspctRsltnCcd());//전결협의체
		temp.setHndEmpno(facade.getDetails().getEno());					// 조작사원번호

		param.setLastYn("N");
		ibims103bMapper.updateLastYn(param);

		/* IBIMS100B UPDATE */
		ibims100BVO.setRmrk(param.getDealNo());
		ibims100BVO.setEmpno(facade.getDetails().getEno());
		ibims100BVO.setHndEmpno(facade.getDetails().getEno());
		ibims100BVO.setMenuId("/TB04020S");

		ibims100bMapper.deleteIBIMS100BInfo(ibims100BVO);

		return ibims103bMapper.insert103B(temp);
	}

}
