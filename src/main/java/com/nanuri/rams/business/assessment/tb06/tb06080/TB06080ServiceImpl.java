package com.nanuri.rams.business.assessment.tb06.tb06080;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.IBIMS232BMapper;
import com.nanuri.rams.business.common.vo.TB06080SVO;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TB06080ServiceImpl implements TB06080Service {

	private final IBIMS232BMapper tb06080sMp;

	@Override
	public TB06080SVO inqTB06080S(TB06080SVO input) {
		TB06080SVO vo = new TB06080SVO();
		
		List<TB06080SVO.ApvlList> apvlList = new ArrayList<TB06080SVO.ApvlList>();
		apvlList = tb06080sMp.inqTB06080S(input);
		List<TB06080SVO.GbckList> gbckList = new ArrayList<TB06080SVO.GbckList>();
		
		for (int i = 0; i < apvlList.size(); i++) {
			
			gbckList.addAll(tb06080sMp.inqIBMS232B(apvlList.get(i)));
			
		}
		
		vo.setApvlList(apvlList);
		vo.setGbckList(gbckList);
		
		return vo;
	}

}
