package com.nanuri.rams.business.assessment.mo44.mo44040;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.RAA10BDTO;
import com.nanuri.rams.business.common.dto.RAA31BDTO;
import com.nanuri.rams.business.common.mapper.MO44040Mapper;
import com.nanuri.rams.business.common.mapper.RAA10BMapper;
import com.nanuri.rams.business.common.mapper.RAA31BMapper;
import com.nanuri.rams.business.common.mapper.RAA91BMapper;
import com.nanuri.rams.business.common.vo.MO44040SVO;
import com.nanuri.rams.business.common.vo.RAA31BVO;
import com.nanuri.rams.com.code.GroupCd;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MO44040ServiceImpl implements MO44040Service{
	
	private final MO44040Mapper mo44040Mapper;
	
	
	private final RAA10BMapper raa10bMapper;
	private final RAA31BMapper raa31bMapper;
	private final RAA91BMapper raa91bMapper;
	
	@Autowired
	private AuthenticationFacade facade;
	
	@Override
	public List<MO44040SVO.DealInfo> getInfo(MO44040SVO.SearchParam searchParam) {

		String oblgPfrmCcd = searchParam.getOblgPfrmCcd();
		List<MO44040SVO.DealInfo> result;
		List<Map<String, Object>> selectBoxList = raa91bMapper.getSelectBox(null);

		if ("01".equals(oblgPfrmCcd)) {
			result = raa31bMapper.getSellDownList(searchParam);
			
			result.get(0).setRiskInspctCcdNm(codeToCodeName(result.get(0).getRiskInspctCcd(), selectBoxList, GroupCd.RISK_INSPCT_CCD.getCode()));
			result.get(0).setLstCCaseCcdNm(codeToCodeName(result.get(0).getLstCCaseCcd(), selectBoxList, GroupCd.LST_C_CASE_CCD.getCode()));
			result.get(0).setInspctCnfrncCcdNm(codeToCodeName(result.get(0).getInspctCnfrncCcd(), selectBoxList, GroupCd.INSPCT_CNFRNC_CCD.getCode()));
			result.get(0).setRsltnRsltCdNm(codeToCodeName(result.get(0).getRsltnRsltCd(), selectBoxList, GroupCd.RSLTN_RSLT_CD.getCode()));
			searchParam.setIbDealNm(oblgPfrmCcd);
			
		} else {
			result = raa31bMapper.getEtcListMO44040S(searchParam);
			
			result.get(0).setRiskInspctCcdNm(codeToCodeName(result.get(0).getRiskInspctCcd(), selectBoxList, GroupCd.RISK_INSPCT_CCD.getCode()));
			result.get(0).setLstCCaseCcdNm(codeToCodeName(result.get(0).getLstCCaseCcd(), selectBoxList, GroupCd.LST_C_CASE_CCD.getCode()));
			//result.get(0).setInspctCnfrncCcdNm(codeToCodeName(result.get(0).getInspctCnfrncCcd(), selectBoxList, GroupCd.INSPCT_CNFRNC_CCD.getCode()));
			//result.get(0).setRsltnRsltCdNm(codeToCodeName(result.get(0).getRsltnRsltCd(), selectBoxList, GroupCd.RSLTN_RSLT_CD.getCode()));
			searchParam.setIbDealNm(oblgPfrmCcd);
		}

		return result;
	}
	
	
	private String codeToCodeName (String code, List<Map<String, Object>> selectBoxList, String groupCd) {
		
		List<Map<String, Object>> groupCdList = new ArrayList<Map<String,Object>>();
		String codeName = null;
		
		if(selectBoxList.size() > 0) {
			for(int i = 0; selectBoxList.size() > i; i++) {
				Map<String, Object> codeInfo = selectBoxList.get(i);
				if(groupCd.equals(codeInfo.get("CMNS_CD_GRP"))) {
					groupCdList.add(codeInfo);
				}
			}
		}
		
		if(groupCdList.size() > 0) {
			for(int i = 0; groupCdList.size() > i; i++) {
				Map<String, Object> codeInfo = groupCdList.get(i);
				String cdVlId = codeInfo.get("CD_VL_ID").toString();
				String cdVlNm = codeInfo.get("CD_VL_NM").toString();
				
				if(code.equals(cdVlId)) {
					if("I016".equals(codeInfo.get("CMNS_CD_GRP").toString())){
						codeName = cdVlId;
					}else {
						codeName = cdVlNm;
					}
					break;
				}
			}
		}
		
		return codeName;
	}

	
	@Override
	public void savePlans(MO44040SVO.DealInfo paramData) {
		
		int result;
		RAA31BVO.SearchParam searchParam = new RAA31BVO.SearchParam();
		searchParam.setIbDealNo(paramData.getIbDealNo().toString());
		searchParam.setRiskInspctCcd(paramData.getRiskInspctCcd().toString());
		searchParam.setLstCCaseCcd(paramData.getLstCCaseCcd().toString());
		searchParam.setItemSq(paramData.getItemSq());
		searchParam.setOblgPfrmCcd(paramData.getOblgPfrmCcd().toString());
		
		// raa31b 를 찾아보고 없으면 insert 한다.
		RAA31BDTO raa31b = raa31bMapper.selectRaa31b(searchParam);
		
		if(raa31b == null) {
			// insert
			// 화면정보vo -> raa31bDTO
			result = raa31bMapper.insertRaa31b(searchParam);
			
			if(result > 0) {
				raa31b = new RAA31BDTO();
				raa31b.setOblgPfrmCcd(paramData.getOblgPfrmCcd().toString());
				raa31b.setIbDealNo(paramData.getIbDealNo().toString());
				raa31b.setRiskInspctCcd(paramData.getRiskInspctCcd().toString());
				raa31b.setLstCCaseCcd(paramData.getLstCCaseCcd().toString());
				raa31b.setItemSq(paramData.getItemSq());
				raa31b.setRprPrgrsStCd("10");										// 의무이행구분코드
				raa31b.setAchvDt(paramData.getAchvDt());							// 셀다운일자
				raa31b.setNPfrmRsnCntnt(paramData.getNPfrmRsnCntnt());				// 미이행사유
				raa31b.setPfrmPlanCntnt(paramData.getPfrmPlanCntnt());				// 향후계획
				raa31b.setPrcsPlanCntnt1(paramData.getPrcsPlanCntnt1());			// basecase
				raa31b.setPrcsPlanCntnt2(paramData.getPrcsPlanCntnt2());			// stresscase
				raa31b.setValSpclCntnt(paramData.getValSpclCntnt());				// 기타특이사항
				raa31b.setHndlDprtCd(facade.getDetails().getDprtCd());
				raa31b.setHndlPEno(facade.getDetails().getEno());
				
				result = raa31bMapper.updateRaa31b(raa31b);
			}
		} else {
			//update
			// 화면정보vo -> raa31bDTO
			raa31b.setRprPrgrsStCd("10");										// 의무이행구분코드
			raa31b.setAchvDt(paramData.getAchvDt());							// 셀다운일자
			raa31b.setNPfrmRsnCntnt(paramData.getNPfrmRsnCntnt());				// 미이행사유
			raa31b.setPfrmPlanCntnt(paramData.getPfrmPlanCntnt());				// 향후계획
			raa31b.setPrcsPlanCntnt1(paramData.getPrcsPlanCntnt1());			// basecase
			raa31b.setPrcsPlanCntnt2(paramData.getPrcsPlanCntnt2());			// stresscase
			raa31b.setValSpclCntnt(paramData.getValSpclCntnt());				// 기타특이사항
			
			// 수정시 재승인 필요
			raa31b.setAprvDyTm1(null);
			raa31b.setAprvPEno1(null);
			raa31b.setAprvDyTm2(null);
			raa31b.setAprvPEno2(null);
			raa31b.setAprvDyTm3(null);
			raa31b.setAprvPEno3(null);
			raa31b.setAprvDyTm4(null);
			raa31b.setAprvPEno4(null);
			
			raa31b.setHndlDprtCd(facade.getDetails().getDprtCd());
			raa31b.setHndlPEno(facade.getDetails().getEno());
			
			result = raa31bMapper.updateRaa31b(raa31b);
		}
		
	}

	@Override
	public void savePFRM(MO44040SVO.DealInfo paramData) {
		
		int result;
		RAA31BVO.SearchParam searchParam = new RAA31BVO.SearchParam();
		searchParam.setIbDealNo(paramData.getIbDealNo().toString());
		searchParam.setRiskInspctCcd(paramData.getRiskInspctCcd().toString());
		searchParam.setLstCCaseCcd(paramData.getLstCCaseCcd().toString());
		searchParam.setItemSq(paramData.getItemSq());
		searchParam.setOblgPfrmCcd(paramData.getOblgPfrmCcd().toString());
		
		RAA10BDTO raa10b = raa10bMapper.selectRaa10b(searchParam);
		
		if(raa10b != null) {
			raa10b.setEndF(paramData.getEndF());
			raa10b.setPfrmDt(paramData.getPfrmDt());
			raa10b.setRmrk(paramData.getPfrmCntnt());
			raa10b.setHndlDprtCd(facade.getDetails().getDprtCd());
			raa10b.setHndlPEno(facade.getDetails().getEno());
			
			result = raa10bMapper.updateRaa10b(raa10b);
		}
		
	}

	@Override
	public void savePrgrs(RAA31BDTO paramData) {
		
		int result;
		
		RAA31BVO.SearchParam searchParam = new RAA31BVO.SearchParam();
		searchParam.setIbDealNo(paramData.getIbDealNo().toString());
		searchParam.setRiskInspctCcd(paramData.getRiskInspctCcd().toString());
		searchParam.setLstCCaseCcd(paramData.getLstCCaseCcd().toString());
		searchParam.setItemSq(paramData.getItemSq());
		searchParam.setOblgPfrmCcd(paramData.getOblgPfrmCcd().toString());
		
		RAA31BDTO raa31b = raa31bMapper.selectRaa31b(searchParam);
		
		if(raa31b != null) {
			 // 현재 날짜 구하기
	        LocalDate now = LocalDate.now();
	 
	        // 2. LocalDate -> Date 변환
	        Date date = java.sql.Date.valueOf(now);
			
			// rprPrgrsStCd에 따른 업데이트 항목 설정
			if ("20".equals(paramData.getRprPrgrsStCd())) {
				raa31b.setRprPrgrsStCd(paramData.getRprPrgrsStCd());
				raa31b.setAprvDyTm1(date);
				raa31b.setAprvPEno1(facade.getDetails().getEno());
			} else if ("11".equals(paramData.getRprPrgrsStCd())) {
				raa31b.setRprPrgrsStCd(paramData.getRprPrgrsStCd());
				raa31b.setAprvDyTm1(null);
				raa31b.setAprvPEno1(null);
				raa31b.setAprvDyTm2(null);
				raa31b.setAprvPEno2(null);
				raa31b.setAprvDyTm3(null);
				raa31b.setAprvPEno3(null);
				raa31b.setAprvDyTm4(null);
				raa31b.setAprvPEno4(null);
			} else if ("30".equals(paramData.getRprPrgrsStCd())) {
				raa31b.setRprPrgrsStCd(paramData.getRprPrgrsStCd());
				raa31b.setAprvDyTm2(date);
				raa31b.setAprvPEno2(facade.getDetails().getEno());
			} else if ("40".equals(paramData.getRprPrgrsStCd())) {
				raa31b.setRprPrgrsStCd(paramData.getRprPrgrsStCd());
				raa31b.setAprvDyTm3(date);
				raa31b.setAprvPEno3(facade.getDetails().getEno());
			} else if ("50".equals(paramData.getRprPrgrsStCd())) {
				raa31b.setRprPrgrsStCd(paramData.getRprPrgrsStCd());
				raa31b.setAprvDyTm4(date);
				raa31b.setAprvPEno4(facade.getDetails().getEno());
			}
			
			
			// TODO: 
			// 심사역 수정시 진행상태 변경하지 않음
			
			
			
			// 대체투자관리부 부서장은 바로 진행상태완료처리
	        if("".equals(facade.getDetails().getRghtCd())) {
	        	raa31b.setRprPrgrsStCd(paramData.getRprPrgrsStCd());
				raa31b.setAprvDyTm2(date);
				raa31b.setAprvPEno2(facade.getDetails().getEno());
				raa31b.setAprvDyTm3(date);
				raa31b.setAprvPEno3(facade.getDetails().getEno());
				raa31b.setAprvDyTm4(date);
				raa31b.setAprvPEno4(facade.getDetails().getEno());
	        }
			
			raa31b.setHndlDprtCd(facade.getDetails().getDprtCd());
			raa31b.setHndlPEno(facade.getDetails().getEno());
			
			result = raa31bMapper.updateRaa31b(raa31b);
		}
	}
  
}


