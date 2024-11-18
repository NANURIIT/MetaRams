package com.nanuri.rams.business.assessment.tb08.tb08020;

import com.nanuri.rams.business.common.mapper.RAA02BMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class TB08020ServiceImpl implements TB08020Service {
	
	private final RAA02BMapper raa02bMapper;
	
	@Override
	public List<HashMap<String, String>> getDealMnrtList(HashMap<String, String> paramData) {
		return raa02bMapper.getDealMnrtList(paramData);
	}

}
