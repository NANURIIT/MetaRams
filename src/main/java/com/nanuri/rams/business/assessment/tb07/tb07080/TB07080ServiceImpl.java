package com.nanuri.rams.business.assessment.tb07.tb07080;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS402BDTO;
import com.nanuri.rams.business.common.dto.IBIMS404BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS402BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS404BMapper;
import com.nanuri.rams.business.common.vo.IBIMS402BVO;
import com.nanuri.rams.business.common.vo.IBIMS404BVO;
import com.nanuri.rams.business.common.vo.TB06015SVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB07080ServiceImpl implements TB07080Service {
    

    private final IBIMS402BMapper ibims402bMapper;
	private final IBIMS404BMapper ibims404bMapper;
	
	@Autowired
	private AuthenticationFacade facade;

	@Override
	public IBIMS402BVO selectOneIBIMS402B(IBIMS402BVO data) {
		IBIMS402BVO result = ibims402bMapper.selectOneIBIMS402B(data);
		return result;
	}

	@Override
	public List<IBIMS404BVO> getIntrRateInfos(TB06015SVO data) {
		List<IBIMS404BVO> result = ibims404bMapper.getIntrRateInfos(data);
		return result;
	}

	@Override
	public List<String> getExcSnTB06015P(String prdtCd) {
		List<String> result = ibims402bMapper.getExcSnTB06015P(prdtCd);
		return result;
	}

	@Override
    public int uptExcInfo(IBIMS402BDTO data) {

		data.setHndEmpno(facade.getDetails().getEno());

		int result = ibims402bMapper.uptExcInfo(data);
		return result;
	};

	@Override
	public int insertListIBIMS404B(TB06015SVO paramData){
		String prdtCd = "";
		long excSn = 0;
		prdtCd = paramData.getPrdtCd();
		excSn = paramData.getExcSn();
		
		int result = 0;

		List<IBIMS404BDTO> intrtList = paramData.getIntrtList();

		for (IBIMS404BDTO item : intrtList) {
			item.setPrdtCd(prdtCd);
			item.setExcSn(excSn);
			item.setHndEmpno(facade.getDetails().getEno());
			item.setHndTmnlNo("");
			item.setHndTrId("");
			item.setGuid("");
		}
		
		paramData.setIntrtList(intrtList);

		result = ibims404bMapper.insertListIBIMS404B(paramData);
		
		return result;
	};

	@Override
	public int updateListIBIMS404B(IBIMS404BVO paramData){
		String prdtCd = "";
		long excSn = 0;
		prdtCd = paramData.getPrdtCd();
		excSn = paramData.getExcSn();

		int result = 0;
		List<IBIMS404BVO> inList = paramData.getIntrtList();

		for(int i = 0; i < inList.size(); i++){
			inList.get(i).setHndEmpno(facade.getDetails().getEno());
			inList.get(i).setPrdtCd(prdtCd);
			inList.get(i).setExcSn(excSn);
			ibims404bMapper.updateListIBIMS404B(inList.get(i));
			result += 1;
		}

		return result;
	};

	@Override
    public int deleteIBIMS404B(TB06015SVO paramData){
		int result = ibims404bMapper.deleteIBIMS404B(paramData);
		return result;
	};

}
