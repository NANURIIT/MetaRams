package com.nanuri.rams.business.assessment.as04.as04210;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.RAA02BDTO;
import com.nanuri.rams.business.common.dto.RAA22BDTO;
import com.nanuri.rams.business.common.dto.RAA23BDTO;
import com.nanuri.rams.business.common.mapper.RAA02BMapper;
import com.nanuri.rams.business.common.mapper.RAA09BMapper;
import com.nanuri.rams.business.common.mapper.RAA10BMapper;
import com.nanuri.rams.business.common.mapper.RAA21BMapper;
import com.nanuri.rams.business.common.mapper.RAA22BMapper;
import com.nanuri.rams.business.common.mapper.RAA23BMapper;
import com.nanuri.rams.business.common.mapper.RAA91BMapper;
import com.nanuri.rams.business.common.vo.AS04210SVO.CASEInfo;
import com.nanuri.rams.business.common.vo.AS04210SVO.IBDEALInfo;
import com.nanuri.rams.business.common.vo.AS04210SVO.MMBRInfo;
import com.nanuri.rams.business.common.vo.AS04210SVO.SearchVO;
import com.nanuri.rams.com.code.GroupCd;
import com.nanuri.rams.com.security.AuthenticationFacade;
import com.nanuri.rams.com.utils.CodeUtil;
import com.nanuri.rams.com.utils.DateUtil;
import com.nanuri.rams.com.utils.StringUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AS04210ServiceImpl implements AS04210Service {

	private final RAA02BMapper raa02bMapper;
	private final RAA09BMapper raa09bMapper;
	private final RAA10BMapper raa10bMapper;
	private final RAA21BMapper raa21bMapper;
	private final RAA22BMapper raa22bMapper;
	private final RAA23BMapper raa23bMapper;
	private final RAA91BMapper raa91bMapper;
	// private final AS04210Mapper as04210Mapper;

	@Autowired
	private AuthenticationFacade facade;

	@Override
	public List<CASEInfo> getCASEInfo(SearchVO paramData) {

		// 코드명 변환용
		List<Map<String, Object>> codeList = raa91bMapper.getSelectBox(null);

		// yyyy-MM-dd => yyyyMMdd
		paramData.setRsltnDt(DateUtil.changeDateFormat(paramData.getRsltnDt(), "yyyyMMdd"));
		List<CASEInfo> result = raa21bMapper.searchCNFRNC(paramData);

		if (result.size() > 0) {
			List<CASEInfo> returns = new ArrayList<CASEInfo>();

			for (int i = 0; result.size() > i; i++) {
				CASEInfo resultVO = result.get(i);

				resultVO.setInspctCnfrncCcdNm(CodeUtil.codeToCodeName(resultVO.getInspctCnfrncCcd(), codeList, GroupCd.INSPCT_CNFRNC_CCD.getCode()));
				resultVO.setRsltnRsltCdNm(CodeUtil.codeToCodeName(resultVO.getRsltnRsltCd(), codeList, GroupCd.RSLTN_RSLT_CD.getCode()));
				resultVO.setRiskInspctCcdNm(CodeUtil.codeToCodeName(resultVO.getRiskInspctCcd(), codeList, GroupCd.RISK_INSPCT_CCD.getCode()));
				resultVO.setLstCCaseCcdNm(CodeUtil.codeToCodeName(resultVO.getLstCCaseCcd(), codeList, GroupCd.LST_C_CASE_CCD.getCode()));
				resultVO.setInvstCrncyCdNm(CodeUtil.codeToCodeName(resultVO.getInvstCrncyCd(), codeList, GroupCd.INVST_CRNCY_CD.getCode()));
				resultVO.setRsltnDt(DateUtil.changeDateFormat(resultVO.getRsltnDt(), "yyyy-MM-dd"));

				returns.add(resultVO);
			}

			return returns;
		} else {
			return null;
		}

	}

	// 위원정보 조회
	@Override
	public List<MMBRInfo> getMMBRInfo(SearchVO paramData) {
		List<MMBRInfo> result = raa21bMapper.getMMBRInfoAS04210(paramData);
		if (result.size() > 0) {
			for (int i = 0; result.size() > i; i++) {
				result.get(i).setRgstDt(DateUtil.changeDateFormat(result.get(i).getRgstDt(), "yyyy-MM-dd"));
			}
		}
		return result;
	}

	// 안건정보 조회
	@Override
	public List<IBDEALInfo> getIBDEALInfo(SearchVO paramData) {

		// 코드명 변환용
		List<Map<String, Object>> codeList = raa91bMapper.getSelectBox(null);

		List<IBDEALInfo> result = raa21bMapper.getIBDEALInfo(paramData);


		if (result.size() > 0) {
			List<IBDEALInfo> returns = new ArrayList<IBDEALInfo>();

			for (int i = 0; result.size() > i; i++) {
				IBDEALInfo resultVO = result.get(i);

				resultVO.setRiskInspctCcdNm(CodeUtil.codeToCodeName(resultVO.getRiskInspctCcd(), codeList, GroupCd.RISK_INSPCT_CCD.getCode()));
				resultVO.setLstCCaseCcdNm(CodeUtil.codeToCodeName(resultVO.getLstCCaseCcd(), codeList, GroupCd.LST_C_CASE_CCD.getCode()));
				resultVO.setInvstCrncyCdNm(CodeUtil.codeToCodeName(resultVO.getInvstCrncyCd(), codeList, GroupCd.INVST_CRNCY_CD.getCode()));
				resultVO.setRsltnRsltCdNm(CodeUtil.codeToCodeName(resultVO.getRsltnRsltCd(), codeList, GroupCd.RSLTN_RSLT_CD.getCode()));

				returns.add(resultVO);
			}

			return returns;
		} else {
			return null;
		}
	}

	// 의결내용 저장
	@Override
	public void saveRAA23BInfo(List<Map<String, Object>> param) {

		for (int i = 0; param.size() > i; i++) {
			Map<String, Object> map = param.get(i);

			if (map != null) {
				RAA23BDTO raa23bDTO = new RAA23BDTO();

				// key
				raa23bDTO.setInspctCnfrncCcd(map.get("inspctCnfrncCcd").toString());
				raa23bDTO.setStdYr(map.get("stdYr").toString());
				raa23bDTO.setInspctCnfrncSqcSq(Integer.valueOf(map.get("inspctCnfrncSqcSq").toString()));
				raa23bDTO.setRnkNo(Integer.valueOf(map.get("rnkNo").toString()));
				raa23bDTO.setAtdncPEno(map.get("atdncPEno").toString());
				raa23bDTO.setCmmttMmbrCcd(map.get("cmmttMmbrCcd").toString());
				// value
				if (map.get("mode").toString().equals("confirm")) {
					raa23bDTO.setCmmttMmbrCcd(map.get("cmmttMmbrCcd").toString());
					raa23bDTO.setRealAtdncF(map.get("realAtdncF").toString());
					raa23bDTO.setAprvOpstnCcd(map.get("aprvOpstnCcd").toString());
					if(map.get("rvwCmmtCntnt") != null) {
						raa23bDTO.setRvwCmmtCntnt(map.get("rvwCmmtCntnt").toString());
					}
					raa23bDTO.setRgstDt(DateUtil.changeDateFormat(map.get("rgstDt").toString(), "yyyyMMdd"));
				}
				raa23bDTO.setHndlDprtCd(facade.getDetails().getDprtCd());
				raa23bDTO.setHndlPEno(facade.getDetails().getEno());
				raa23bMapper.updateRAA23BInfo(raa23bDTO);
			}
		}
	}

	// 안건정보 업데이트
	@Override
	public int updateIBDEALInfo(IBDEALInfo param) {
		String rcgAmt = param.getRcgAmt();
		if (StringUtil.isAllWhitespace(rcgAmt)) {
			param.setRcgAmt("0");
		} else {
			param.setRcgAmt(rcgAmt.replace(",", ""));
		}
		param.setHndlDprtCd(facade.getDetails().getDprtCd());
		param.setHndlPEno(facade.getDetails().getEno());

		raa22bMapper.updateIBDEALInfo(param);

		String ibDealNo = param.getIbDealNo();
		String riskInspctCcd = param.getRiskInspctCcd();
		String lstCCaseCcd = param.getLstCCaseCcd();

		String inspctPrgrsStCd = "";
		switch (param.getRsltnRsltCd()) {
		case "":
			inspctPrgrsStCd = "340";
			break;
		case "1":
			inspctPrgrsStCd = "350";
			break;
		case "2":
		case "3":
			inspctPrgrsStCd = "370";
			break;
		case "4":
			inspctPrgrsStCd = "360";
			break;
		case "5":
			inspctPrgrsStCd = "380";
			break;
		default:
			inspctPrgrsStCd = "340";
			break;
		}

		// Deal정보 가져오기
		RAA02BDTO raa02bDTO = raa02bMapper.copyDealInfO(ibDealNo, riskInspctCcd, lstCCaseCcd);
		// 파라미터 셋팅
		raa02bDTO.setInspctPrgrsStCd(inspctPrgrsStCd);

		// 안건정보 업데이트
		raa02bMapper.updateDealInfo(raa02bDTO);

		if ("Y".equals(param.getSdnCndtF())) {
			// RAA09B 승인조건(셀다운) 정보 INSERT
			raa09bMapper.insertSndCndt(param);
		} else {
			// RAA09B 승인조건(셀다운) 정보 DELETE
			raa09bMapper.deleteSndCndt(param);
		}

		if ("Y".equals(param.getEtcCndtF())) {
			// RAA10B 승인조건(기타) 정보 INSERT
			raa10bMapper.insertEtcCndt(param);
		} else {
			// RAA10B 승인조건(기타) 정보 DELETE
			raa10bMapper.deleteEtcCndt(param);
		}

		return 0;
	}

	// 안건제외
	@Override
	public int deleteRAA22BDeal(List<Map<String, Object>> inputList) {

		RAA02BDTO raa02bDTO = new RAA02BDTO();

		RAA22BDTO raa22bDTO = new RAA22BDTO();

		RAA23BDTO raa23BDTO = new RAA23BDTO();

		for (int i = 0; i < inputList.size(); i++) {

			Map<String, Object> inputArr = inputList.get(i);
			/* #################################################### */
			/* RAA02B 에서 해당 안건의 진행상태 UPDATE(310 : 협의체부의중) */
			/* #################################################### */

			// 파라미터 정보 셋팅
			raa02bDTO.setIbDealNo(inputArr.get("ibDealNo").toString());
			raa02bDTO.setRiskInspctCcd(inputArr.get("riskInspctCcd").toString());
			raa02bDTO.setLstCCaseCcd(inputArr.get("lstCCaseCcd").toString());
			raa02bDTO.setInspctPrgrsStCd("300");

			// Transaction
			raa02bMapper.updateInspctPrgrsStCd(raa02bDTO);

			/* ############################## */
			/* RAA22B 에서 해당 안건 삭제 DELETE */
			/* ############################## */

			// 파라미터 정보 셋팅
			raa22bDTO.setInspctCnfrncCcd(inputArr.get("inspctCnfrncCcd").toString());
			raa22bDTO.setStdYr(inputArr.get("stdYr").toString());
			raa22bDTO.setInspctCnfrncSqcSq(Integer.parseInt(inputArr.get("inspctCnfrncSqcSq").toString()));
			raa22bDTO.setIbDealNo(inputArr.get("ibDealNo").toString());
			raa22bDTO.setRiskInspctCcd(inputArr.get("riskInspctCcd").toString());
			raa22bDTO.setLstCCaseCcd(inputArr.get("lstCCaseCcd").toString());

			// Transaction
			raa22bMapper.deleteRAA22BInfo(raa22bDTO);

			/* ####################################### */
			/* RAA23B 에서 해당 안건의 위원정보 삭제 DELETE */
			/* ####################################### */

			// 파라미터 정보 셋팅
			raa23BDTO.setInspctCnfrncCcd(inputArr.get("inspctCnfrncCcd").toString());
			raa23BDTO.setStdYr(inputArr.get("stdYr").toString());
			raa23BDTO.setInspctCnfrncSqcSq(Integer.parseInt(inputArr.get("inspctCnfrncSqcSq").toString()));
			raa23BDTO.setRnkNo(Integer.parseInt(inputArr.get("rnkNo").toString()));

			// Transaction
			raa23bMapper.deleteRAA23BDealInfo(raa23BDTO);

		}
		/* ############################################### */
		/* RAA22B 에서 해당 회차에서 남은 안건들의 순위번호 재부여 */
		/* ############################################### */

		/* 회차 정보 조회 */
		int[] rnkNoArr = raa22bMapper.selectRnkNoInfo(raa22bDTO);

		// 파라미터 셋팅
		Map<String, Object> input = new HashMap<>();

		input.put("inspctCnfrncCcd", raa22bDTO.getInspctCnfrncCcd());
		input.put("stdYr", raa22bDTO.getStdYr());
		input.put("inspctCnfrncSqcSq", raa22bDTO.getInspctCnfrncSqcSq());

		for (int i = 0; i < rnkNoArr.length; i++) {

			input.remove("beforeRnkNo");
			input.remove("afterRnkNo");

			input.put("beforeRnkNo", rnkNoArr[i]);
			input.put("afterRnkNo", (i + 1));

			raa22bMapper.updateRnkNoRAA22B(input);

			raa23bMapper.updateRnkNoRAA23B(input);
		}

		// 파라미터 정보 셋팅
		// raa22bMapper.selectRAA22BInfo();

		return 0;
	}

}
