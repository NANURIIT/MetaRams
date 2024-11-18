package com.nanuri.rams.business.assessment.as05.as05110;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.RAA02BDTO;
import com.nanuri.rams.business.common.dto.RAA11BDTO;
import com.nanuri.rams.business.common.mapper.RAA01BMapper;
import com.nanuri.rams.business.common.mapper.RAA02BMapper;
import com.nanuri.rams.business.common.mapper.RAA11BMapper;
import com.nanuri.rams.business.common.vo.RAA21BVO.CASEVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AS05110ServiceImpl implements AS05110Service {
	
	private final RAA01BMapper raa01bMapper;
	private final RAA02BMapper raa02bMapper;
	private final RAA11BMapper raa11bMapper;
	
	@Autowired
	private AuthenticationFacade facade;
	
	
	// Deal목록 조회
	@Override
	public List<CASEVO> getDealDetails(CASEVO paramData) {
		return raa02bMapper.getDealDetailAS05110S(paramData);
	}
	
	// 담당자/심사역변경
	@Override
	public void savePEno(List<Map<String, Object>> param) {
		int inptCcd = Integer.parseInt(param.get(0).get("inptCcd").toString());
		
		for(int i=0; i<param.size(); i++) {		
			RAA02BDTO dto = new RAA02BDTO();
			dto.setIbDealNo(param.get(i).get("ibDealNo").toString());
			dto.setRiskInspctCcd(param.get(i).get("riskInspctCcd").toString());
			dto.setLstCCaseCcd(param.get(i).get("lstCCaseCcd").toString());
			dto.setHndlDprtCd(facade.getDetails().getDprtCd());
			dto.setHndlPEno(facade.getDetails().getEno());
			if(inptCcd == 1) {	// 담당자 변경
				dto.setDprtCd(param.get(i).get("dprtCd").toString());
				dto.setHdqtCd(param.get(i).get("hdqtCd").toString());
				dto.setChrgPEno(param.get(i).get("chrgPEno").toString());
			} else { // 심사역변경
				dto.setOwnPEno(param.get(i).get("ownPEno").toString());
			}
			raa02bMapper.updateChrgOwnPEno(dto);
			
			if(inptCcd == 2) { // 변경이력저장
				RAA11BDTO history = new RAA11BDTO();
				history.setIbDealNo(param.get(i).get("ibDealNo").toString());
				history.setRiskInspctCcd(param.get(i).get("riskInspctCcd").toString());
				history.setLstCCaseCcd(param.get(i).get("lstCCaseCcd").toString());
				history.setCndctRgstEno(param.get(i).get("ownPEno").toString());
				history.setUptRsnCntnt("일괄변경");
				history.setHndlDprtCd(facade.getDetails().getDprtCd());
				history.setHndlPEno(facade.getDetails().getEno());
				
				raa11bMapper.insertOwnPEnoH(history);
			}
		}
		
		//담당자변경일 경우 deal번호에 해당하는 담당자 일괄변경
		if(inptCcd == 1) { 
			// 안건번호 중복제거
			String[] ibDealNos = new String[param.size()];
			for(int x=0; x<param.size(); x++) {
				ibDealNos[x] = param.get(x).get("ibDealNo").toString();
			}
			// hashset 클래스를 이용하여 중복제거 (StringArray >> HashSet)
			HashSet<String> hashSet = new HashSet<>(Arrays.asList(ibDealNos));
			// 중복제거된 HashSet 타입의 collection 을 String Array로 변환 (HashSet >> StringArray)
			String[] arrDealNo = hashSet.toArray(new String[0]);
			String dprtCd = param.get(0).get("dprtCd").toString();
			String hdqtCd = param.get(0).get("hdqtCd").toString();
			String chrgPEno = param.get(0).get("chrgPEno").toString();
			
			raa01bMapper.updateChrgPEno(arrDealNo, facade.getDetails().getDprtCd(), facade.getDetails().getEno(), dprtCd, hdqtCd, chrgPEno);
		}
	}

}
