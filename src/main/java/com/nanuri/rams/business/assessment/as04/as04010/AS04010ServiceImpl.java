package com.nanuri.rams.business.assessment.as04.as04010;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.RAA02BDTO;
import com.nanuri.rams.business.common.mapper.RAA02BMapper;
import com.nanuri.rams.business.common.mapper.RAA91BMapper;
import com.nanuri.rams.business.common.vo.RAA02BVO.AS04010SVO;
import com.nanuri.rams.com.code.GroupCd;
import com.nanuri.rams.com.code.InspctCnfrncCcdEnum;
import com.nanuri.rams.com.security.AuthenticationFacade;
import com.nanuri.rams.com.utils.DateUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AS04010ServiceImpl implements AS04010Service {

	private final RAA02BMapper raa02bMapper;
	private final RAA91BMapper raa91bMapper;
	// private final AS04010Mapper as04010Mapper;

	@Autowired
	private AuthenticationFacade facade;

	// Deal 목록 조회
	@Override
	public List<AS04010SVO> getDealList(RAA02BDTO dealDto) {

		List<Map<String, Object>> selectBoxList = raa91bMapper.getSelectBox(null);

		AS04010SVO inputVO = new AS04010SVO();

		inputVO.setIbDealNo(dealDto.getIbDealNo());

		List<AS04010SVO> dealInfo = raa02bMapper.getDealIfno(inputVO);

		List<AS04010SVO> returns = new ArrayList<>();

		if (dealInfo != null) {

			for (int i = 0; i < dealInfo.size(); i++) {
				AS04010SVO returnParam = dealInfo.get(i);

				returnParam.setRiskInspctCcdNm(codeToCodeName(returnParam.getRiskInspctCcd(), selectBoxList, GroupCd.RISK_INSPCT_CCD.getCode()));			// 리스크심사구분코드
				returnParam.setLstCCaseCcdNm(codeToCodeName(returnParam.getLstCCaseCcd(), selectBoxList, GroupCd.LST_C_CASE_CCD.getCode()));				// 부수안건구분코드
				returnParam.setInvstCrncyCdNm(codeToCodeName(returnParam.getInvstCrncyCd(), selectBoxList, GroupCd.INVST_CRNCY_CD.getCode()));				// 통화
				returnParam.setInspctPrgrsStCdNm(codeToCodeName(returnParam.getInspctPrgrsStCd(), selectBoxList, GroupCd.INSPCT_PRGRS_ST_CD.getCode()));	// 심사진행상태

				returnParam.setRprStrtDt(DateUtil.changeDateFormat(returnParam.getRprStrtDt(),"yyyy-MM-dd"));					// 협의시작일
				returnParam.setOfclDocAcptDt(DateUtil.changeDateFormat(returnParam.getOfclDocAcptDt(),"yyyy-MM-dd"));			// 공문접수일
				returnParam.setAplcExptDt(DateUtil.changeDateFormat(returnParam.getAplcExptDt(),"yyyy-MM-dd"));				// 부의예정일

				returns.add(returnParam);
			}

		}

		return returns;
	}

	// Deal 상세조회
	@Override
	public AS04010SVO getDealDetail(RAA02BDTO dealDto) {

		List<Map<String, Object>> selectBoxList = raa91bMapper.getSelectBox(null);

		AS04010SVO inputDto = new AS04010SVO();

		inputDto.setIbDealNo(dealDto.getIbDealNo());
		inputDto.setRiskInspctCcd(dealDto.getRiskInspctCcd());
		inputDto.setLstCCaseCcd(dealDto.getLstCCaseCcd());


		List<AS04010SVO> dealInfo = raa02bMapper.getDealIfno(inputDto);

		inputDto = dealInfo.get(0);

		if (dealInfo != null) {

			dealInfo.get(0).setRiskInspctCcdNm(codeToCodeName(dealInfo.get(0).getRiskInspctCcd(), selectBoxList, GroupCd.RISK_INSPCT_CCD.getCode()));			// 리스크심사구분코드
			dealInfo.get(0).setLstCCaseCcdNm(codeToCodeName(dealInfo.get(0).getLstCCaseCcd(), selectBoxList, GroupCd.LST_C_CASE_CCD.getCode()));				// 부수안건구분코드
			dealInfo.get(0).setInvstCrncyCdNm(codeToCodeName(dealInfo.get(0).getInvstCrncyCd(), selectBoxList, GroupCd.INVST_CRNCY_CD.getCode()));				// 통화
			dealInfo.get(0).setInspctPrgrsStCdNm(codeToCodeName(dealInfo.get(0).getInspctPrgrsStCd(), selectBoxList, GroupCd.INSPCT_PRGRS_ST_CD.getCode()));	// 심사진행상태
			dealInfo.get(0).setRprStrtDt(DateUtil.changeDateFormat(dealInfo.get(0).getRprStrtDt(),"yyyy-MM-dd"));					// 협의시작일
			dealInfo.get(0).setOfclDocAcptDt(DateUtil.changeDateFormat(dealInfo.get(0).getOfclDocAcptDt(),"yyyy-MM-dd"));			// 공문접수일
			dealInfo.get(0).setAplcExptDt(DateUtil.changeDateFormat(dealInfo.get(0).getAplcExptDt(),"yyyy-MM-dd"));				// 부의예정일

		}

		return inputDto;
	}

	private String codeToCodeName(String code, List<Map<String, Object>> selectBoxList, String groupCd) {

		List<Map<String, Object>> groupCdList = new ArrayList<Map<String, Object>>();
		String codeName = null;

		if (selectBoxList.size() > 0) {
			for (int i = 0; selectBoxList.size() > i; i++) {
				Map<String, Object> codeInfo = selectBoxList.get(i);
				if (groupCd.equals(codeInfo.get("CMNS_CD_GRP"))) {
					groupCdList.add(codeInfo);
				}
			}
		}

		if (groupCdList.size() > 0) {
			for (int i = 0; groupCdList.size() > i; i++) {
				Map<String, Object> codeInfo = groupCdList.get(i);
				String cdVlId = codeInfo.get("CD_VL_ID").toString();
				String cdVlNm = codeInfo.get("CD_VL_NM").toString();

				if (code.equals(cdVlId)) {
					if ("I016".equals(codeInfo.get("CMNS_CD_GRP").toString())) {
						codeName = cdVlId;
					} else {
						codeName = cdVlNm;
					}
					break;
				}
			}
		}

		return codeName;
	}

	// 협의체부의 저장
	@Override
	public Map<String, Object> saveDealInfo(AS04010SVO paramData) {

		String riskInspctRsltnCcd = paramData.getRiskInspctRsltnCcd();
		InspctCnfrncCcdEnum rsltnCnfrncCcd = InspctCnfrncCcdEnum.getEnumByValue(riskInspctRsltnCcd);

		//paramData.setRiskInspctRsltnCcd(riskInspctRsltnCcd.getCode());											// 리스크심사결의구분코드
		paramData.setRsltnCnfrncCcd(rsltnCnfrncCcd.getCode());
		paramData.setRprStrtDt(DateUtil.changeDateFormat(paramData.getRprStrtDt(),"yyyyMMdd"));					// 보고시작일자
		paramData.setOfclDocAcptDt(DateUtil.changeDateFormat(paramData.getOfclDocAcptDt(),"yyyyMMdd"));			// 공문접수일자
		paramData.setAplcExptDt(DateUtil.changeDateFormat(paramData.getAplcExptDt(),"yyyyMMdd"));				// 적용예정일자
		
		paramData.setHndlDprtCd(facade.getDetails().getDprtCd());												// 처리부점코드
		paramData.setHndlPEno(facade.getDetails().getEno());													// 처리자번
		
		raa02bMapper.saveDealInfo(paramData);

		Map<String, Object> dealInfoMap = new HashMap<String, Object>();
		dealInfoMap.put("ibDealNo", paramData.getIbDealNo());
		dealInfoMap.put("riskInspctCcd", paramData.getRiskInspctCcd());
		dealInfoMap.put("lstCCaseCcd", paramData.getLstCCaseCcd());

		return dealInfoMap;
	}

	// 협의체부의 변경
	@Override
	public Map<String, Object> updateDealInfo(AS04010SVO paramData) {

		String ibDealNo = paramData.getIbDealNo();
		String inspctPrgrsStCd = paramData.getInspctPrgrsStCd();
		String riskInspctCcd = paramData.getRiskInspctCcd();
		String lstCCaseCcd = paramData.getLstCCaseCcd();

		RAA02BDTO dealDetail = raa02bMapper.copyDealInfO(ibDealNo, riskInspctCcd, lstCCaseCcd);

		dealDetail.setInspctPrgrsStCd(inspctPrgrsStCd);
		dealDetail.setHndlDprtCd(facade.getDetails().getDprtCd());												// 처리부점코드
		dealDetail.setHndlPEno(facade.getDetails().getEno());													// 처리자번

		raa02bMapper.updateDealInfo(dealDetail);

		Map<String, Object> dealInfoMap = new HashMap<String, Object>();
		dealInfoMap.put("ibDealNo", paramData.getIbDealNo());
		dealInfoMap.put("riskInspctCcd", paramData.getRiskInspctCcd());
		dealInfoMap.put("lstCCaseCcd", paramData.getLstCCaseCcd());

		return dealInfoMap;
	}

}
