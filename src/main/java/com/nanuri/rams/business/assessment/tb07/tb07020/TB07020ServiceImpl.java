package com.nanuri.rams.business.assessment.tb07.tb07020;

import com.nanuri.rams.business.common.mapper.IBIMS201BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS401BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS402BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS402HMapper;
import com.nanuri.rams.business.common.mapper.IBIMS405BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS410BMapper;
import com.nanuri.rams.business.common.vo.IBIMS405BVO;
import com.nanuri.rams.business.common.vo.IBIMS410BVO;
import com.nanuri.rams.business.common.vo.IBIMS201BVO;
import com.nanuri.rams.business.common.vo.IBIMS402BVO;
import com.nanuri.rams.business.common.vo.IBIMS402HVO;
import com.nanuri.rams.business.common.dto.IBIMS405BDTO;
import com.nanuri.rams.business.common.dto.IBIMS410BDTO;
import com.nanuri.rams.business.common.dto.IBIMS402BDTO;
import com.nanuri.rams.business.common.dto.IBIMS402HDTO;
import com.nanuri.rams.com.security.AuthenticationFacade;
import lombok.RequiredArgsConstructor;

import org.apache.poi.hpsf.Decimal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class TB07020ServiceImpl implements TB07020Service {

	/* 기타투자정보 */
	private final IBIMS405BMapper ibims405BMapper;
	/* 딜거래내역 */
	private final IBIMS410BMapper ibims410BMapper;
	/* 여신실행기본 */
	private final IBIMS402BMapper ibims402BMapper;
	/* 여신실행이력 */
	private final IBIMS402HMapper ibims402HMapper;
	/* 여신약정 */
	private final IBIMS401BMapper ibims401BMapper;
	/* 딜기본정보 */
	private final IBIMS201BMapper ibims201bMapper;

	@Autowired
	private AuthenticationFacade facade;

	@Override
	public List<IBIMS405BVO> getBuyList(IBIMS405BDTO paramData) {
		return ibims405BMapper.getBuyList(paramData);
	}

	@Override
	public int getTrSn(IBIMS405BDTO paramData) {
		return ibims405BMapper.getTrSn(paramData);
	}

	// 기타투자정보(매수) 저장
	@Override
	public int saveBuyInfo(IBIMS405BDTO paramData) {
		return ibims405BMapper.saveBuyInfo(paramData);
	}

	// 기타투자정보(매수) 삭제
	@Override
	public int cancelBuyInfo(IBIMS405BDTO paramData) {
		return ibims405BMapper.cancelBuyInfo(paramData);
	}

	//딜거래내역 저장
	@Override
	public int saveDlTrList(IBIMS410BDTO paramData) {
		paramData.setHndEmpno(facade.getDetails().getEno());
		return ibims410BMapper.saveDlTrList(paramData);
	}

	//딜거래내역 수정
	@Override
	public int updateDlTrList(IBIMS410BDTO paramData) {
		paramData.setHndEmpno(facade.getDetails().getEno());
		return ibims410BMapper.updateDlTrList(paramData);
	}

	//딜거래내역 취소
	@Override
	public int cancelDlTrList(IBIMS410BDTO paramData) {
		paramData.setHndEmpno(facade.getDetails().getEno());
		return ibims410BMapper.cancelDlTrList(paramData);
	}
	//여신실행기본조회 데이터확인
	@Override
	public String chkExcInfo(String param) {
		return ibims402BMapper.chkExcInfo(param);
	}
	//딜실행기본 insert Auto Key
	@Override
	public int saveExcInfo(IBIMS402BDTO param) {
		return ibims402BMapper.saveExcInfo(param);
	}
	//딜실행기본 update
	@Override
	public int uptExcInfoTr(IBIMS402BDTO param) {
		return ibims402BMapper.uptExcInfoTr(param);
	}
	//딜실행기본 insert No Key
	@Override
	public int saveExcInfoNoKey(IBIMS402BDTO param) {
		return ibims402BMapper.saveExcInfoNoKey(param);
	}
	//딜실행기본이력 insert Auto Key
	@Override
	public int insertIBIMS402HTr(IBIMS402BDTO param) {

		int rtnValue = 0;



		IBIMS201BVO ibims201bvo = ibims201bMapper.selectOnlyOneIBIMS201B(param.getPrdtCd());

		ibims201bvo.setLastYn("N");
		rtnValue = ibims201bMapper.updateIBIMS201BDTO(ibims201bvo);
		ibims201bvo.setLastYn("Y");
		ibims201bvo.setPrgSttsCd("602");
		rtnValue = ibims201bMapper.regPrdtCd(ibims201bvo);

		return ibims402HMapper.insertIBIMS402HTr(param);
	}
	//여신실행기본조회 데이터확인
	@Override
	public String getEprzCrdlCtrcAmt(String param) {
		return ibims401BMapper.getEprzCrdlCtrcAmt(param);
	}


}