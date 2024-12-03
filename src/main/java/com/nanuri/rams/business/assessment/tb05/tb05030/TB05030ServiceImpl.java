package com.nanuri.rams.business.assessment.tb05.tb05030;

import com.nanuri.rams.business.common.dto.IBIMS103BDTO;
import com.nanuri.rams.business.common.dto.RAA02BDTO;
import com.nanuri.rams.business.common.dto.RAA22BDTO;
import com.nanuri.rams.business.common.dto.RAA23BDTO;
import com.nanuri.rams.business.common.mapper.*;
import com.nanuri.rams.business.common.vo.IBIMS115BVO;
import com.nanuri.rams.business.common.vo.TB05030SVO;
import com.nanuri.rams.com.security.AuthenticationFacade;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB05030ServiceImpl implements TB05030Service {

	// AS-IS
	// private final RAA02BMapper raa02bMapper;
	// private final RAA22BMapper raa22bMapper;
	// private final RAA23BMapper raa23bMapper;

	// TO-BE
	private final IBIMS103BMapper ibims103BMapper;
	private final IBIMS112BMapper ibims112BMapper;
	private final IBIMS115BMapper ibims115BMapper;
	private final IBIMS117BMapper ibims117BMapper;
	private final IBIMS118BMapper ibims118BMapper;


	private final AuthenticationFacade facade;

	@Override
	public List<TB05030SVO> getCASEInfo(Map<String, Object> paramData) {
		return ibims112BMapper.getCASEInfo(paramData);
	}

	// 위원정보 조회
	@Override
	public List<IBIMS115BVO> getMMBRInfo(Map<String, Object> paramData) {
		return ibims115BMapper.getMMBRInfoTB05030S(paramData);
	}

	// 안건정보 조회
	@Override
	public List<TB05030SVO> getIBDEALInfo(Map<String, Object> paramData) { return ibims112BMapper.getIBDEALInfo(paramData); }

	// 의결내용 저장
	@Override
	public int updateMMBRInfo(List<Map<String, Object>> paramData) {
		// 의결내용 확정
		if( "confirm".equals(paramData.get(0).get("mode").toString()) ) {
			return ibims115BMapper.confirmMMBRInfo(paramData);
		// 의결내용 취소
		}else{
			return ibims115BMapper.cancelMMBRInfo(paramData);
		}
	}

	// 협의결과 저장
	@Override
	public int updateIBDEALInfo(Map<String, Object> paramData) {

		String mtrPrgSttsDcd = "";
		log.debug(paramData.get("mtrPrgSttsDcd").toString());
		switch ( paramData.get("mtrPrgSttsDcd").toString() ) {
			// 가결
			case "1":
				mtrPrgSttsDcd = "309";
				break;
			// 조건부가결 or 가결(자체조건)
			case "2":
			case "3":
				mtrPrgSttsDcd = "308";
				break;
			// 부결
			case "4":
				mtrPrgSttsDcd = "307";
				break;
			// 보류
			case "5":
				mtrPrgSttsDcd = "306";
				break;
			default:
				mtrPrgSttsDcd = "304";
				break;
		}
		if (paramData.get("mode").toString() == "cancel") {
			mtrPrgSttsDcd = "304";
		}
		IBIMS103BDTO param = new IBIMS103BDTO();

		param.setDealNo(paramData.get("dealNo").toString());
		param.setJdgmDcd(paramData.get("jdgmDcd").toString());
		param.setMtrDcd(paramData.get("mtrDcd").toString());

		// 최종 안건정보 취득 및 최종 안건 여부 변경
		param = ibims103BMapper.selectOne103B(param);
		param.setLastYn("N");
		ibims103BMapper.updateLastYn(param);

		/* parameter setting */
		param.setMtrPrgSttsDcd(mtrPrgSttsDcd);
		param.setHndEmpno(facade.getDetails().getEno());
		param.setLastYn("Y");
		// 리스크승인번호 채번
		String riskRcgNo = facade.getDetails().getDprtCd();
		// 현재 년도, 월, 일, 시간, 분, 초 가져오기.
		LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
		riskRcgNo += now.format(formatter);

		param.setRiskRcgNo(riskRcgNo);

		// IBIMS103B 협의결과 INSERT
		ibims103BMapper.insert103B(param);


		paramData.put("hndlDprtCd", facade.getDetails().getDprtCd());	// 처리부점코드
		paramData.put("hndlPEno"  , facade.getDetails().getEno());		// 처리자사번

		if ("Y".equals(paramData.get("sdnCndtF"))) {
			// RAA09B 승인조건(셀다운) 정보 INSERT
			ibims117BMapper.insertSndCndt(paramData);
		} else {
			// RAA09B 승인조건(셀다운) 정보 DELETE
			ibims117BMapper.deleteSndCndt(paramData);
		}

		if ("Y".equals(paramData.get("etcCndtF"))) {
			// RAA10B 승인조건(기타) 정보 INSERT
			ibims118BMapper.insertEtcCndt(paramData);
		} else {
			// RAA10B 승인조건(기타) 정보 DELETE
			ibims118BMapper.deleteEtcCndt(paramData);
		}

		// IBIMS112B 협의결과 UPDATE
		paramData.put("mtrPrgSttsDcd", mtrPrgSttsDcd);
		return ibims112BMapper.updateCNFRNCInfo(paramData);
	}

	// 안건제외
	// @Override
	// public int deleteRAA22BDeal(List<Map<String, Object>> inputList) {

	// 	RAA02BDTO raa02bDTO = new RAA02BDTO();

	// 	RAA22BDTO raa22bDTO = new RAA22BDTO();

	// 	RAA23BDTO raa23BDTO = new RAA23BDTO();

	// 	for (int i = 0; i < inputList.size(); i++) {

	// 		Map<String, Object> inputArr = inputList.get(i);
	// 		/* #################################################### */
	// 		/* RAA02B 에서 해당 안건의 진행상태 UPDATE(310 : 협의체부의중) */
	// 		/* #################################################### */

	// 		// 파라미터 정보 셋팅
	// 		raa02bDTO.setIbDealNo(inputArr.get("ibDealNo").toString());
	// 		raa02bDTO.setRiskInspctCcd(inputArr.get("riskInspctCcd").toString());
	// 		raa02bDTO.setLstCCaseCcd(inputArr.get("lstCCaseCcd").toString());
	// 		raa02bDTO.setInspctPrgrsStCd("300");

	// 		// Transaction
	// 		raa02bMapper.updateInspctPrgrsStCd(raa02bDTO);

	// 		/* ############################## */
	// 		/* RAA22B 에서 해당 안건 삭제 DELETE */
	// 		/* ############################## */

	// 		// 파라미터 정보 셋팅
	// 		raa22bDTO.setInspctCnfrncCcd(inputArr.get("inspctCnfrncCcd").toString());
	// 		raa22bDTO.setStdYr(inputArr.get("stdYr").toString());
	// 		raa22bDTO.setInspctCnfrncSqcSq(Integer.parseInt(inputArr.get("inspctCnfrncSqcSq").toString()));
	// 		raa22bDTO.setIbDealNo(inputArr.get("ibDealNo").toString());
	// 		raa22bDTO.setRiskInspctCcd(inputArr.get("riskInspctCcd").toString());
	// 		raa22bDTO.setLstCCaseCcd(inputArr.get("lstCCaseCcd").toString());

	// 		// Transaction
	// 		raa22bMapper.deleteRAA22BInfo(raa22bDTO);

	// 		/* ####################################### */
	// 		/* RAA23B 에서 해당 안건의 위원정보 삭제 DELETE */
	// 		/* ####################################### */

	// 		// 파라미터 정보 셋팅
	// 		raa23BDTO.setInspctCnfrncCcd(inputArr.get("inspctCnfrncCcd").toString());
	// 		raa23BDTO.setStdYr(inputArr.get("stdYr").toString());
	// 		raa23BDTO.setInspctCnfrncSqcSq(Integer.parseInt(inputArr.get("inspctCnfrncSqcSq").toString()));
	// 		raa23BDTO.setRnkNo(Integer.parseInt(inputArr.get("rnkNo").toString()));

	// 		// Transaction
	// 		raa23bMapper.deleteRAA23BDealInfo(raa23BDTO);

	// 	}
	// 	/* ############################################### */
	// 	/* RAA22B 에서 해당 회차에서 남은 안건들의 순위번호 재부여 */
	// 	/* ############################################### */

	// 	/* 회차 정보 조회 */
	// 	int[] rnkNoArr = raa22bMapper.selectRnkNoInfo(raa22bDTO);

	// 	// 파라미터 셋팅
	// 	Map<String, Object> input = new HashMap<>();

	// 	input.put("inspctCnfrncCcd", raa22bDTO.getInspctCnfrncCcd());
	// 	input.put("stdYr", raa22bDTO.getStdYr());
	// 	input.put("inspctCnfrncSqcSq", raa22bDTO.getInspctCnfrncSqcSq());

	// 	for (int i = 0; i < rnkNoArr.length; i++) {

	// 		input.remove("beforeRnkNo");
	// 		input.remove("afterRnkNo");

	// 		input.put("beforeRnkNo", rnkNoArr[i]);
	// 		input.put("afterRnkNo", (i + 1));

	// 		raa22bMapper.updateRnkNoRAA22B(input);

	// 		raa23bMapper.updateRnkNoRAA23B(input);
	// 	}

	// 	// 파라미터 정보 셋팅
	// 	// raa22bMapper.selectRAA22BInfo();

	// 	return 0;
	// }

}
