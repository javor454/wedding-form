.PHONY: deploy dev dev-stop

# Start development server with mock API
dev:
	@echo "Starting development server at http://localhost:8000"
	@echo "Mock API available at http://localhost:8080"
	@echo "Press Ctrl+C to stop or run 'make dev-stop'"
	docker compose up dev wiremock

# Stop development server
dev-stop:
	docker compose down

# Deploy to production
deploy:
	docker compose run --rm -T vercel sh -c 'vercel --yes --prod --token $$VERCEL_TOKEN'
