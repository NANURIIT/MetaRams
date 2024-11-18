package com.nanuri.rams.business.assessment.tb08.tb08020;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public interface TB08020Service {

	List<HashMap<String, String>> getDealMnrtList(HashMap<String, String> paramData);

}
