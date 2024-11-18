package com.nanuri.rams.business.dashboard.ds01010;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.DS01010SVO.inqueryParameters;

@Service
public interface DS01010Service {

	List<Map<String, Object>> getTable1(inqueryParameters param);

	List<Map<String, Object>> getTable2(inqueryParameters param);
	
	List<Map<String, Object>> getTable3(inqueryParameters param);
	
	List<Map<String, Object>> getTable4(inqueryParameters param);
	
	List<Map<String, Object>> getTable5(inqueryParameters param);
	
}
