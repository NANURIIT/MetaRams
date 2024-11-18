package com.nanuri.rams.business.assessment.as04.as04310;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.RAA22BMapper;
import com.nanuri.rams.business.common.mapper.RAA91BMapper;
import com.nanuri.rams.business.common.vo.AS04310SVO.DealInfo;
import com.nanuri.rams.business.common.vo.AS04310SVO.SearchVO;
import com.nanuri.rams.com.code.GroupCd;
import com.nanuri.rams.com.utils.CodeUtil;
import com.nanuri.rams.com.utils.DateUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AS04310ServiceImpl implements AS04310Service {

	private final RAA22BMapper raa22bMapper;

	private final RAA91BMapper raa91bMapper;

	// private final AS04310Mapper as04310Mapper;

	@Override
	public List<DealInfo> searchDeals(SearchVO paramData) {

		List<Map<String, Object>> selectBoxList = raa91bMapper.getSelectBox(null);

		paramData.setRsltnDtStart(DateUtil.changeDateFormat(paramData.getRsltnDtStart(), "yyyyMMdd"));
		paramData.setRsltnDtEnd(DateUtil.changeDateFormat(paramData.getRsltnDtEnd(), "yyyyMMdd"));

		List<DealInfo> result = raa22bMapper.as04310sSelectCaseInfo(paramData);

		if (result.size() > 0) {
			for (int i = 0; result.size() > i; i++) {
				result.get(i).setInspctCnfrncCcdNm(CodeUtil.codeToCodeName(result.get(i).getInspctCnfrncCcd(), selectBoxList, GroupCd.INSPCT_CNFRNC_CCD.getCode()));
				result.get(i).setRsltnDt(DateUtil.changeDateFormat(result.get(i).getRsltnDt(), "yyyy-MM-dd"));
				result.get(i).setLstCCaseCcdNm(CodeUtil.codeToCodeName(result.get(i).getLstCCaseCcd(), selectBoxList, GroupCd.LST_C_CASE_CCD.getCode()));
				result.get(i).setRiskInspctCcdNm(CodeUtil.codeToCodeName(result.get(i).getRiskInspctCcd(), selectBoxList, GroupCd.RISK_INSPCT_CCD.getCode()));
				result.get(i).setCheckItemCdNm(CodeUtil.codeToCodeName(result.get(i).getCheckItemCd(), selectBoxList, GroupCd.CHECK_ITEM_CD.getCode()));
				result.get(i).setInvstCrncyCdNm(CodeUtil.codeToCodeName(result.get(i).getInvstCrncyCd(), selectBoxList, GroupCd.INVST_CRNCY_CD.getCode()));
				result.get(i).setRsltnRsltCdNm(CodeUtil.codeToCodeName(result.get(i).getRsltnRsltCd(), selectBoxList, GroupCd.RSLTN_RSLT_CD.getCode()));
			}
		}
		return result;
	}

}
